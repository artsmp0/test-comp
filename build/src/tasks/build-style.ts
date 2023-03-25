import { src, dest } from 'gulp';
import gulpLess from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import glob from 'fast-glob';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

interface BuildParams {
  srcRoot: string;
  outputEs: string;
  outputLib: string;
  output: string;
  pkgRoot: string;
}

export const buildStyle = (buildParams: BuildParams) => {
  return async () => {
    await Promise.all([buildLess(buildParams), copyLess(buildParams), buildFull(buildParams), buildStyleModules(buildParams)]);
  };
};

const buildLess = async ({ srcRoot, outputEs, outputLib }: { srcRoot: string; outputEs: string; outputLib: string }) => {
  await new Promise(resolve => {
    src(`${srcRoot}/**/style/*.less`)
      // @ts-ignore
      .pipe(gulpLess({ javascriptEnabled: true }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(cleanCss())
      .pipe(dest(outputEs))
      .pipe(dest(outputLib))
      .on('end', resolve);
  });
};

const copyLess = async ({ srcRoot, outputEs, outputLib }: BuildParams) => {
  await new Promise(resolve => {
    src(`${srcRoot}/**/*.less`).pipe(dest(outputEs)).pipe(dest(outputLib)).on('end', resolve);
  });
};

const buildFull = async ({ output, srcRoot }: BuildParams) => {
  await new Promise(resolve => {
    src(`${srcRoot}/*.less`)
      // @ts-ignore
      .pipe(gulpLess({ javascriptEnabled: true }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(cleanCss())
      .pipe(dest(output))
      .on('end', resolve);
  });
};

const buildStyleModules = async ({ outputEs, outputLib, srcRoot }: BuildParams) => {
  const input = [...(await glob(`${srcRoot}/**/style/*.ts`)), `${srcRoot}/resolver.ts`];
  console.log('input: ', input);
  const bundle = await rollup({
    input,
    plugins: [
      esbuild({
        sourceMap: true,
      }),
    ],
    external: [/./],
    treeshake: false,
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
