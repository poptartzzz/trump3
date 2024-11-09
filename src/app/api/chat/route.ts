import Pusher from 'pusher';
import { messageStore } from '@/lib/message-store';

const pusher = new Pusher({
  appId: "1893445",
  key: "181d264c0437add91668",
  secret: "c5f197934ce16b09b0aa",
  cluster: "mt1",
  useTLS: true
});

export async function POST(req: Request) {
  const message = await req.json();
  messageStore.addMessage(message);
  await pusher.trigger('chat', 'message', message);
  return new Response('OK');
}

export async function GET() {
  return Response.json({ messages: messageStore.getMessages() });
} 