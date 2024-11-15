import { WebSocket, WebSocketServer } from 'ws';

interface Client extends WebSocket {
  isAlive: boolean;
}

interface ChatMessage {
  address: string;
  content: string;
  timestamp: Date;
}

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set<Client>();

// Store messages in memory (you might want to use a database in production)
const messageHistory: ChatMessage[] = [];
const MAX_MESSAGES = 50; // Keep last 50 messages

// Ping clients every 30 seconds to keep connections alive
const interval = setInterval(() => {
  clients.forEach((client) => {
    if (!client.isAlive) {
      clients.delete(client);
      return client.terminate();
    }
    
    client.isAlive = false;
    client.ping();
  });
}, 30000);

wss.on('connection', (ws: Client) => {
  ws.isAlive = true;
  clients.add(ws);

  // Send message history to new client
  if (messageHistory.length > 0) {
    ws.send(JSON.stringify({
      type: 'history',
      messages: messageHistory
    }));
  }

  // Handle pong responses
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handle incoming messages
  ws.on('message', (data: string) => {
    try {
      const message: ChatMessage = JSON.parse(data);
      
      // Store message in history
      messageHistory.push(message);
      // Keep only last MAX_MESSAGES
      if (messageHistory.length > MAX_MESSAGES) {
        messageHistory.shift();
      }
      
      // Broadcast to all connected clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'message',
            message
          }));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Remove client on disconnect
  ws.on('close', () => {
    clients.delete(ws);
  });
});

wss.on('close', () => {
  clearInterval(interval);
});

console.log('WebSocket server running on port 8080');