import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { GupoAntdvResolver } from '@gupo/antdv-components/lib/resolver';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
console.log('======', path.resolve(__dirname, '../packages/antdv-components/src/$2'));
const base = path.resolve(__dirname, '../packages/antdv-components/src');
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: [
        {
          find: /^@gupo\/antdv-components(\/(es|lib))?$/,
          replacement: path.resolve(base, 'index.ts'),
          customResolver(resolve) {
            console.log('++++++++++++++resolve: ', resolve);
            return resolve;
          },
        },
        {
          find: /^@gupo\/antdv-components\/(es|lib)\/(.*)$/,
          replacement: `${base}/$2`,
          customResolver(resolve) {
            console.log('=============resolve: ', resolve);
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
