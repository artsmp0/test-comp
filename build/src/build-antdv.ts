import { dest, parallel, series, src } from 'gulp';
import { buildFull, buildModules, buildStyle, clean, genTypes } from './tasks';
import { antdvOutput, antdvOutputEs, antdvOutputLib, antdvPkgJson, antdvPkgRoot, antdvSrcRoot, pkgRoot, PKG_CAMEL_NAME } from './utils';

export const copyFiles = () => Promise.all([src(antdvPkgJson).pipe(dest(antdvOutput))]);

export default series(
  clean,
  parallel(
    copyFiles,
    buildFull({ output: antdvOutput, pkgCamelName: PKG_CAMEL_NAME, pkgJson: antdvPkgJson, srcRoot: antdvSrcRoot }),
    buildModules({ srcRoot: antdvSrcRoot, pkgJson: antdvPkgJson, outputEs: antdvOutputEs, outputLib: antdvOutputLib, pkgRoot: pkgRoot }),
    genTypes({ outputEs: antdvOutputEs, outputLib: antdvOutputLib, pkgRoot: antdvPkgRoot }),
    buildStyle({ output: antdvOutput, srcRoot: antdvSrcRoot, outputEs: antdvOutputEs, outputLib: antdvOutputLib, pkgRoot })
  )
);
