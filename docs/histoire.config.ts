import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './histoire.setup.ts',
  vite: {
    server: {
      host: '0.0.0.0',
    },
  },
  tree: {
    groups: [
      {
        title: 'Antdv 组件',
        include: file => {
          return file.path.includes('antdv');
        },
      },
      {
        title: 'Vant 组件',
        include: file => {
          return file.path.includes('vant');
        },
      },
    ],
  },
});
