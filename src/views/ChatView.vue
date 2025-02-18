<template>
  <header>
    <div class="avatar">{{getInitials(name)}}</div>
    <div class="flex-col avatar-user">
      <span>{{ name }}</span>
      <p>Online</p>
    </div>
    <IconLogout @click="handleLogout"/>
  </header>
  <main>
    <div class="message-list" >
      <div v-for="msg in storeMessages" :key="msg.id" :class="{ 'message-list__right-side': msg.name === name }">
        <div class="name-container">{{ msg.name === name ? 'You' : msg.name }}</div>
        <div class="msg-container">{{ msg.message }}</div>
        <div class="time-container">{{ msg.time }}</div>
      </div>
    </div>
  </main>
  <footer>
    <form @submit.prevent="onSendMessage">
      <input ref="textField" v-model="addedMessage" placeholder="Type a message" />
      <button type="submit">
        <IconSend />
      </button>
    </form>
  </footer>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import {storeToRefs} from "pinia";
import IconLogout from "@/components/icons/IconLogout.vue";
import router from "@/router/index.ts";
import IconSend from "@/components/icons/IconSend.vue";
import {computed, inject, onMounted, ref, watchEffect} from "vue";
import {useMessageStore} from "@/store/messages.ts";
import { v4 as uuidv4 } from 'uuid';

const apiUrl = '/api/Messenger/send';

const userStore = useUserStore();
const { name, isAuthenticated } = storeToRefs(userStore);
const signalR = inject("signalR");
const messageStore = useMessageStore();
const addedMessage = ref('')
const textField = ref(null);
const storeMessages = computed(() => messageStore.messages);

onMounted(() => {
  textField.value.focus()
  if (!isAuthenticated.value) {
    router.push("/home");
  }
  if (signalR) {
    signalR.on("ReceiveMessage", (user, message) => {
      const receivedAt = new Date().toLocaleString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit",
      });
      messageStore.addMessage({
        id: uuidv4(),
        name: user,
        message,
        time: receivedAt
      })
      const audio = new Audio('/mp3/sound.mp3');
      audio.play();
    });
  }
});
/**
 * Sends a message to the server and updates the store.
 * @async
 * @function
 */
const onSendMessage = async () => {
  try {
    if(addedMessage.value){
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:name.value, text: addedMessage.value })
      });
      await response.json();
      addedMessage.value = "";
    }
  } catch (error) {
    console.error('Request error:', error);
  }
}
/**
 * Extracts the initials from the user's name.
 * @param {string} name - The user's full name.
 * @returns {string} - The user's initials.
 */
const getInitials = (name) =>{
  if (name){
    return name.split('')[0].toUpperCase();
  }
}
/**
 * Handles user logout and redirects to the home page.
 * @function
 */
const handleLogout = () => {
  userStore.logout();
  router.push("/home");
}
</script>
<style>
header{
  border-bottom:1px solid var(--border-header);
  width: calc(100% + 64px);
  margin-left: -32px;
  padding:10px 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.avatar{
  border-radius: 50%;
  width: 63px;
  height: 63px;
  background-color: var(--avatar-bg);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px
}
.avatar-user{
  gap: 6px;
  flex-grow: 1;
}
.avatar-user span{
  font-size: 17px;
  color: var(--color-text);
}
.avatar-user p {
  font-size: 14px;
  color: var(--status-text-green);
}
main {
  margin-top: 20px;
  height: 600px;
  overflow-y: auto;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-list__right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;
}

.msg-container {
  padding: 14px 16px;
  border-radius: 18px;
  background-color: var(--msg-bg);
  color: var(--color-text);
  width: fit-content;
  white-space: normal;
  word-break: break-word;
}

.time-container {
  margin-left: 10px;
  margin-top: 5px;
  color: var(--time-color);
}

.name-container {
  margin-left: 10px;
  margin-bottom: 5px;
  color: var(--time-color);
}

footer {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

footer form {
  display: flex;
  align-items: center;
  width: 100%;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid var(--border-input);
  font-size: 16px;
}

button {
  background: transparent;
  border: none;
}
</style>
