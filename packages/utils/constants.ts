import path from 'path';

export const PKG_NAME = 'antdv-components';
export const PKG_CAMEL_NAME = 'AntdvComponents';

export const projRoot = path.resolve(__dirname, '../../');
export const pkgRoot = path.resolve(projRoot, 'packages');
// antdv 业务组件库的根目录
export const antdvPkgRoot = path.resolve(pkgRoot, 'antdv-components');
// antdv 业务组件库的源码目录
export const antdvSrcRoot = path.resolve(antdvPkgRoot, 'src');

// output
export const antdvOutput = path.resolve(antdvPkgRoot, 'dist');
export const antdvOutputEs = path.resolve(antdvOutput, 'es');
export const antdvOutputLib = path.resolve(antdvOutput, 'lib');

// package.json
export const antdvPkgJson = path.resolve(antdvPkgRoot, 'package.json');
