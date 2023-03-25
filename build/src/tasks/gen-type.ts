import { execa } from 'execa';
import { src, dest } from 'gulp';

export const genTypes = ({ pkgRoot, outputEs, outputLib }: { pkgRoot: string; outputLib: string; outputEs: string }) => {
  return async () => {
    await execa('vue-tsc', ['-p', 'tsconfig.json'], {
      cwd: pkgRoot,
    });

    return src(`${outputEs}/**/*.d.ts`).pipe(dest(`${outputLib}`));
  };
};
