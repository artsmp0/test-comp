import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { AntDesignVueResolver, VantResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'css' }), VantResolver({ importStyle: false })],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      strict: false,
    },
  },
  preview: {
    host: '0.0.0.0',
  },
});
