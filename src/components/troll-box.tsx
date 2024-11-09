'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wallet, Send } from 'lucide-react'
import { useWallet } from '@/app/providers'
import Pusher from 'pusher-js';

const PUSHER_KEY = "181d264c0437add91668";
const PUSHER_CLUSTER = "mt1";

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER
});

const channel = pusher.subscribe('chat');

interface Message {
  address: string
  content: string
  timestamp: Date
}

export function TrollBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { address, isConnected, connect, disconnect } = useWallet()

  // Initialize WebSocket connection
  useEffect(() => {
    channel.bind('message', (data: Message) => {
      setMessages(prev => [...prev, {
        address: data.address,
        content: data.content,
        timestamp: new Date(data.timestamp)
      }]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !isConnected) return;

    const message = {
      address: address as string,
      content: newMessage.trim(),
      timestamp: new Date()
    };

    // Send to Pusher
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    setNewMessage('');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#63e211] font-press-start-2p text-sm">TROLL BOX</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <ScrollArea className="flex-1 w-full rounded-md border border-[#63e211]/20 bg-black/30 p-4">
          <div ref={scrollRef} className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#63e211] font-press-start-2p">
                    {formatAddress(msg.address)}
                  </span>
                  <span className="text-[10px] text-[#63e211]/50 font-press-start-2p">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[#63e211] font-press-start-2p break-words">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {isConnected && (
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p text-xs"
            />
            <Button
              onClick={handleSend}
              className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button 
          onClick={isConnected ? disconnect : connect}
          variant={isConnected ? "outline" : "default"}
          className={`w-full flex items-center gap-2 font-press-start-2p ${
            isConnected 
              ? "border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20" 
              : "bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20"
          }`}
        >
          <Wallet className="h-4 w-4" />
          {isConnected ? formatAddress(address as string) : "CONNECT WALLET"}
        </Button>
      </CardContent>
    </Card>
  )
} 