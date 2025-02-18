import './assets/main.scss'
import { createConnection } from "./services/signalrService";
import { createPinia} from "pinia";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const signalRConnection = createConnection();
app.provide("signalR", signalRConnection);
app.use(createPinia());
app.use(router)
app.mount('#app')
