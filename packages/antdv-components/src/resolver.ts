import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types';
import { kebabCase } from 'unplugin-vue-components';

// 判断是不是服务端渲染
const isSSR = Boolean(process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG);
const name = '@gupo/antdv-components';

// 服务端渲染使用 cjs 模块，反之使用 esm 模块
const moduleType = isSSR ? 'lib' : 'es';

// 解析器的参数配置
export interface GpResolverOptions {
  // 执行加载 css 还是 less，默认加载 css
  importStyle?: boolean | 'css' | 'less';
}

// 获取到副作用
function getSideEffects(dirName: string, options: GpResolverOptions): SideEffectsInfo | undefined {
  // 是否加载
  const { importStyle = true } = options;
  if (!importStyle || isSSR) return;

  // 获取到副作用的路径
  if (importStyle === 'less') {
    return `${name}/${moduleType}/${dirName}/style/index`;
  }
  return `${name}/${moduleType}/${dirName}/style/css`;
}

export function GupoAntdvResolver(options: GpResolverOptions = { importStyle: 'css' }): ComponentResolver {
  return {
    type: 'component', // 组件类型
    resolve: (name: string) => {
      // 判断解析的组件名称是不是当前组件库的
      if (name.startsWith('Gpa')) {
        // 获取到组件名称
        return {
          // 组件名称
          name: name,
          // 从哪个路径导入，es/lib
          from: `@gupo/antdv-components/${moduleType}`,
          // 根据组件名称获取到对应的 css 导入路径。GpTable => es/gp-table/style/index
          sideEffects: getSideEffects(kebabCase(name.slice(3)), options),
        };
      }
    },
  };
}
