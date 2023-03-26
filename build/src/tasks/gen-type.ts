import { execa } from 'execa';
import { src, dest } from 'gulp';
import { BuildParams } from '../utils/types';

export const genTypes = ({ pkgRoot, outputEs, outputLib }: BuildParams) => {
  return async function genTypesTask() {
    await execa('vue-tsc', ['-p', 'tsconfig.json'], {
      cwd: pkgRoot,
    });

    return src(`${outputEs}/**/*.d.ts`).pipe(dest(`${outputLib}`));
  };
};
