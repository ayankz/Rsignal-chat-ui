import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: [] as { message: string; time: string; name: string }[],
  }),
  actions: {
    addMessage(message: {id: string, message: string; time: string; name: string }) {
      const exists = this.messages.some(msg =>  msg.time === message.time);
      if (!exists) {
        this.messages.push(message);
      }
    },
  },
});
