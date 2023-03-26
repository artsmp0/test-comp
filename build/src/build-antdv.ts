import { dest, parallel, series, src } from 'gulp';
import { buildFull, buildModules, buildStyle, clean, genTypes } from './tasks';
import { antdvOutput, antdvOutputEs, antdvOutputLib, antdvPkgJson, antdvPkgRoot, antdvSrcRoot, PKG_CAMEL_NAME } from './utils';

export const copyFiles = () => Promise.all([src(antdvPkgJson).pipe(dest(antdvOutput))]);

const buildParams = {
  output: antdvOutput,
  pkgCamelName: PKG_CAMEL_NAME,
  pkgJson: antdvPkgJson,
  srcRoot: antdvSrcRoot,
  outputEs: antdvOutputEs,
  outputLib: antdvOutputLib,
  pkgRoot: antdvPkgRoot,
};

export default series(clean, parallel(copyFiles, buildFull(buildParams), buildModules(buildParams), genTypes(buildParams), buildStyle(buildParams)));
