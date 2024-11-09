interface Message {
  address: string;
  content: string;
  timestamp: Date;
}

class MessageStore {
  private messages: Message[] = [];
  private readonly MAX_MESSAGES = 100;

  addMessage(message: Message) {
    this.messages.push(message);
    if (this.messages.length > this.MAX_MESSAGES) {
      this.messages.shift(); // Remove oldest message
    }
  }

  getMessages() {
    return this.messages;
  }
}

// Create a singleton instance
export const messageStore = new MessageStore(); 