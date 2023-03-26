import path from 'path';
import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import { genExternal } from '../utils';
import { BuildParams } from '../utils/types';

export const buildModules = ({ pkgJson, outputEs, outputLib, srcRoot }: BuildParams) => {
  return async function buildModulesTask() {
    const entry = [path.resolve(srcRoot, 'index.ts')];
    const bundle = await rollup({
      input: entry,
      treeshake: true,
      plugins: [
        vue(),
        vueJsx(),
        nodeResolve(),
        esbuild({
          sourceMap: true,
          treeShaking: true,
          target: 'esnext',
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
      bundle.write({
        format: 'cjs',
        dir: outputLib,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
        entryFileNames: `[name].js`,
      }),
    ]);
  };
};
