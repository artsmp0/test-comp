import { parallel, series } from 'gulp';
import { buildFull, buildModules, clean, genTypes } from './tasks';
import { antdvOutputEs, antdvOutputLib, antdvPkgRoot } from './utils';

export default series(clean, parallel(buildFull, buildModules, genTypes({ outputEs: antdvOutputEs, outputLib: antdvOutputLib, pkgRoot: antdvPkgRoot })));
