import path from 'path';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { genExternal } from '../utils';

interface BuildParams {
  srcRoot: string;
  pkgJson: string;
  output: string;
  pkgCamelName: string;
}

const build = ({ output, pkgJson, srcRoot, pkgCamelName }: BuildParams) => {
  return async (minify: boolean) => {
    const entry = path.resolve(srcRoot, 'index.ts');
    console.log('entry: ', entry);

    const build = await rollup({
      input: entry,
      treeshake: true,
      plugins: [
        vue(),
        vueJsx(),
        nodeResolve(),
        esbuild({
          sourceMap: minify,
          treeShaking: true,
          target: 'esnext',
        }),
        minify &&
          minifyPlugin({
            target: 'esnext',
            sourceMap: minify,
          }),
      ],
      external: genExternal(pkgJson, { full: false }),
    });

    await Promise.all([
      build.write({
        file: path.resolve(output, `index${minify ? '.min' : ''}.mjs`),
        format: 'es',
        sourcemap: minify,
        exports: undefined,
      }),
      build.write({
        file: path.resolve(output, `index${minify ? '.min' : ''}.js`),
        format: 'umd',
        name: pkgCamelName,
        sourcemap: minify,
        exports: 'named',
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'antd',
          '@ant-design/icons-vue': 'iconsVue',
        },
      }),
    ]);
  };
};

export const buildFull = ({ output, pkgJson, pkgCamelName, srcRoot }: BuildParams) => {
  const b = build({ output, pkgJson, pkgCamelName, srcRoot });
  return async () => {
    await Promise.all([b(false), b(true)]);
  };
};
