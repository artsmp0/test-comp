import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './histoire.setup.ts',
  tree: {
    groups: [
      {
        title: '表格组件',
        include: file => {
          console.log('file: ', file);
          return file.title.includes('Table');
        },
      },
    ],
  },
});
