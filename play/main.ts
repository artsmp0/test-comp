import { createApp } from 'vue';
import App from './src/app.vue';
import 'ant-design-vue/dist/antd.variable.min.css';
// main.ts
import 'virtual:uno.css';
import './index.css';
(async () => {
  // const apps = import.meta.glob('./src/*.vue');
  // const name = location.pathname.replace(/^\//, '') || 'App';
  // console.log('name: ', name);
  // const file = apps[`./src/${name}.vue`];
  // if (!file) {
  //   location.pathname = 'App';
  //   return;
  // }
  // const App = ((await file()) as any).default;
  const app = createApp(App);

  app.mount('#play');
})();
