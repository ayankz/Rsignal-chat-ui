<script setup lang="ts">
import IconUser from "@/components/icons/IconUser.vue";
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const username = ref('');
const router = useRouter();

const loginUser = () => {
  if (username.value.trim()) {
    userStore.login(username.value.trim());
    router.push("/chat");
  }
};
</script>
<template>
  <div class="flex-col center">
    <div class="home-title">
      <h2>Create your name </h2>
      <h3>Get more people to know your name</h3>
    </div>
    <div class="control">
      <IconUser/>
      <input v-model="username" type="text" placeholder="Enter your name">
    </div>
    <div class="btn" @click="loginUser">Continue</div>
  </div>
</template>
<style  scoped lang="scss">
.home-title{
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
}
</style>
