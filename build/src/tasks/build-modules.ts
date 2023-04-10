import path from 'path';
import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import { genExternal } from '../utils';
import { BuildParams } from '../utils/types';
import glob from 'fast-glob';

export const buildModules = ({ pkgJson, outputEs, outputLib, srcRoot }: BuildParams) => {
  return async function buildModulesTask() {
    const entry = [
      ...(await glob('**/*.{ts,vue}', {
        absolute: true,
        onlyFiles: true,
        cwd: srcRoot,
      })),
    ].filter(path => !(path.includes('style') || path.includes('resolver')));
    console.log('genExternal(pkgJson, { full: true }): ', genExternal(pkgJson, { full: true }));

    const bundle = await rollup({
      input: entry,
      treeshake: true,
      plugins: [
        vue(),
        vueJsx(),
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
        esbuild({
          sourceMap: true,
          treeShaking: true,
          target: 'esnext',
          loaders: {
            '.vue': 'ts',
          },
        }),
      ],
      external: genExternal(pkgJson, { full: true }),
    });

    await Promise.all([
      bundle.write({
        format: 'esm',
        dir: outputEs,
        exports: undefined,
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
        entryFileNames: `[name].mjs`,
      }),
      // bundle.write({
      //   format: 'cjs',
      //   dir: outputLib,
      //   exports: 'named',
      //   preserveModules: true,
      //   preserveModulesRoot: 'src',
      //   sourcemap: true,
      //   entryFileNames: `[name].js`,
      // }),
    ]);
  };
};
