'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Wallet } from 'lucide-react'
import { useWallet } from '@/app/providers'
import Pusher from 'pusher-js'

interface MessageData {
  address: string;
  content: string;
  timestamp: string | Date;
}

export function TrollBox() {
  const [messages, setMessages] = useState<MessageData[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { address, isConnected, connect } = useWallet()

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '181d264c0437add91668', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1'
    });

    const channel = pusher.subscribe('chat');
    
    channel.bind('message', (data: MessageData) => {
      setMessages(prev => [...prev, {
        address: data.address,
        content: data.content,
        timestamp: new Date(data.timestamp)
      }]);
    });

    // Fetch message history
    fetch('/api/chat')
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages.map((msg: MessageData) => ({
          address: msg.address,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        })));
      });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('chat');
      pusher.disconnect();
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

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    setNewMessage('');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}..${addr.slice(-2)}`
  }

  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card className="bg-black border-[#63e211]/20 h-full flex flex-col relative z-10">
      <CardHeader className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-b border-[#63e211]/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#63e211] font-press-start-2p text-sm">TROLL BOX</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] p-4">
        <ScrollArea className="flex-1 w-full rounded-md border border-[#63e211]/20 bg-black/30 p-4">
          <div ref={scrollRef} className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#63e211] font-press-start-2p">
                      {formatAddress(msg.address)}
                    </span>
                    <div className="w-[52px] h-4 rounded-full bg-[#CD7F32] flex items-center justify-center">
                      <span className="text-[6px] text-black font-normal mt-[1px]">lvl</span>
                      <span className="text-[9px] text-black font-bold ml-0.5">1</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#63e211]/50 font-press-start-2p">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-[10px] text-[#63e211]/80 font-press-start-2p break-words">
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

        {!isConnected && (
          <Button 
            onClick={() => connect()}
            className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            CONNECT WALLET
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 