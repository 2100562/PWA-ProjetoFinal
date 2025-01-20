import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import './styles.css';
import router from './router';
import { createApp } from 'vue';
import App from './app/App.vue';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';

const pinia = createPinia();
const vuetify = createVuetify({ components, directives });
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#root');
