import { defineStore } from 'pinia';


type Message = {
  id:string;
  message: string;
  name: string;
  time: string;
}
/**
 * Pinia store for managing messages.
 * @typedef {Object} MessageStore
 * @property {Message[]} messages - Array of messages.
 * @property {Function} addMessage - Adds a new message to the messages array.
 */
export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    addMessage(message: Message) {
      const exists = this.messages.some((msg:Message) =>  msg.time === message.time);
      if (!exists) {
        this.messages.push(message);
      }
    },
  },
});
