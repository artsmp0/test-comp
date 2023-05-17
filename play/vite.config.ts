import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { GupoAntdvResolver } from '@gupoui/antdv/lib/resolver';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import UnoCSS from 'unocss/vite';

const base = path.resolve(__dirname, '../packages/antdv-components/src');
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: [
        {
          find: /^@gupoui\/antdv(\/(es|lib))?$/,
          replacement: path.resolve(base, 'index.ts'),
          customResolver(resolve) {
            return resolve;
          },
        },
        {
          find: /^@gupoui\/antdv\/(es|lib)\/(.*)$/,
          replacement: `${base}/$2.ts`,
          customResolver(resolve) {
            return resolve;
          },
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: true,
      https: !!env.HTTPS,
    },
    plugins: [
      UnoCSS(),
      vue(),
      vueJsx(),
      Components({
        include: `${__dirname}/**`,
        resolvers: [AntDesignVueResolver({ importStyle: false }), GupoAntdvResolver({ importStyle: 'less' })],
        dts: false,
      }),
      mkcert(),
      Inspect(),
    ],

    esbuild: {
      target: 'chrome64',
    },
  };
});
