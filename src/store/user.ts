import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',{
  state: ()=>({
    name: '',
    isAuthenticated: false,
  }),
  actions: {
    login(userName:string){
      this.name = userName;
      this.isAuthenticated = true;
    },
    logout(){
      this.name = '';
      this.isAuthenticated = false;
    }
  }
})
