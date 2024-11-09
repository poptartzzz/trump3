interface Message {
  address: string;
  content: string;
  timestamp: Date;
}

class MessageStore {
  private messages: Message[] = [];
  private readonly MAX_MESSAGES = 100;

  constructor() {
    // Load messages from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    }
  }

  addMessage(message: Message) {
    this.messages.push(message);
    if (this.messages.length > this.MAX_MESSAGES) {
      this.messages.shift(); // Remove oldest message
    }
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }
  }

  getMessages() {
    return this.messages;
  }

  clearMessages() {
    this.messages = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatMessages');
    }
  }
}

// Create a singleton instance
export const messageStore = new MessageStore(); 