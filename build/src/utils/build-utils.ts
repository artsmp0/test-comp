export const getPackageInfo = (pkgJsonPath: string) => {
  const { version, dependencies, peerDependencies } = require(pkgJsonPath);
  return {
    version,
    dependencies: Object.keys(dependencies || {}),
    peerDependencies: Object.keys(peerDependencies || {}),
  };
};

export const genExternal = (pkgJsonPath: string, options: { full?: boolean }) => {
  const { dependencies, peerDependencies } = getPackageInfo(pkgJsonPath);
  const externals = peerDependencies;
  if (options.full) {
    externals.push(...dependencies);
  }
  return (id: string) => {
    // 这个包不打算发布，所以直接打包到源码里面
    if (id.startsWith('@gupo/common')) return false;
    return externals.some(dep => id === dep || (options.full && id.startsWith(`${dep}/`)));
  };
};

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)));
};
