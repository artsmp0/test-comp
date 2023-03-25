import { parallel, series } from 'gulp';
import { buildFull, buildModules, buildStyle, clean, genTypes } from './tasks';
import { antdvOutput, antdvOutputEs, antdvOutputLib, antdvPkgJson, antdvPkgRoot, antdvSrcRoot, PKG_CAMEL_NAME } from './utils';

export default series(
  clean,
  parallel(
    buildFull({ output: antdvOutput, pkgCamelName: PKG_CAMEL_NAME, pkgJson: antdvPkgJson, srcRoot: antdvSrcRoot }),
    buildModules({ srcRoot: antdvSrcRoot, pkgJson: antdvPkgJson, outputEs: antdvOutputEs, outputLib: antdvOutputLib }),
    genTypes({ outputEs: antdvOutputEs, outputLib: antdvOutputLib, pkgRoot: antdvPkgRoot }),
    buildStyle({ output: antdvOutput, srcRoot: antdvSrcRoot, outputEs: antdvOutputEs, outputLib: antdvOutputLib })
  )
);
