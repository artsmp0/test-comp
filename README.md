# 使用指南

## 项目目录结构

```
├── build                   # 构建脚本
│  ├── package.json
│  └── src
├── docs                    # 文档
│  ├── antdv                # antdv 业务组件文档
│  ├── components.d.ts
│  ├── histoire.config.ts
│  ├── histoire.setup.ts
│  ├── package.json
│  ├── shims.d.ts
│  ├── tsconfig.json
│  ├── vant                 # vant 业务组件文档
│  └── vite.config.ts
├── eslint-config           # eslint 配置
│  ├── index.js
│  └── package.json
├── lerna.json
├── package-lock.json
├── package.json
├── packages
│  └── antdv-components     # antdv 业务组件
├── play                    # 开发组件时使用
│  ├── env.d.ts
│  ├── index.html
│  ├── main.ts
│  ├── package.json
│  ├── src
│  └── vite.config.ts
├── README.md
├── tsconfig.json
├── typings
│  └── components.d.ts      # 组件类型声明，指向开发时的组件
└── yarn.lock
```

## 组件包目录结构

```
├── package.json
├── src                    # 源码目录
│  ├── gp-table            # 单个组件文件
│  ├── index.less          # 组件包样式入口文件，需要引入所有组件的样式
│  ├── index.ts            # 组件库入口文件，导出所有组件
│  ├── resolver.ts         # 用于按需引入组件的解析器 unplugin-vue-components
│  └── utils               # 组件库用到的工具函数
└── tsconfig.json          # 组件库打包时的 ts 配置，用于输出类型声明文件
```

## 组件目录结构

```
├── index.ts                        # 组件入口，导出组件和组件对应的类型和工具函数等
├── src
│  ├── components                   # 组件子组件抽离
│  │  ├── column-set-popper.vue
│  │  ├── help-message.vue
│  │  └── options.vue
│  ├── hooks                        # 组件逻辑抽离
│  │  ├── use-columns.ts
│  │  ├── use-datasource.ts
│  │  ├── use-scroll.ts
│  │  └── use-selection.ts
│  ├── table.ts                     # 组件 props 和 emit 的声明以及类型
│  ├── table.vue                    # 组件实现
│  └── types.ts                     # 组件的一些类型声明
└── style                           # 组件样式
   ├── css.ts                       # 组件 css 样式导出，用于按需引入
   ├── index.less                   # 组件 less 样式入口，编写组件样式
   └── index.ts                     # 组件 less 样式导出，用于按需引入
```

## 如何添加一个组件？

此处以 antdv 的 gp-table 组件为例：

1. 在 packages/antdv-components/src 中新建一个 gp-table 文件夹；
2. 在 gp-table 文件夹中新建 index.ts、style/css.ts、 style/index.ts、 style/index.less、 src/table.ts、 src/table.vue 文件，以上列举的文件为必要文件；
3. 在 gp-table/index.ts 中填入以下内容，给组件命名，以及导出组件、组件类型、组件工具函数等。

```ts
import { withInstall } from '../utils';
import Table from './src/table.vue';

Table.name = 'GpTable';

export const GpTable = withInstall(Table);
export default GpTable;

export * from './src/table';
```

4. 每添加一个组件，都需要在 packages/antdv-components/src/index.less 中引入组件的样式，如：

```less
@import './gp-table/style/index.less';
// ...导出更多
```

5. 在 packages/antdv-components/src/index.ts 中导出组件，如：

```ts
import type { App } from 'vue';
import { GpTable } from './gp-table';
// 引入更多组件

export { GpTable };
const components = [GpTable];
export function install(app: App) {
  components.forEach(item => {
    if (item.install!) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export default {
  install,
  components,
};
```

## 组件文档编写

组件文档主要采用 histoire 作为文档框架，使用 vite 作为开发环境，文档编写在 docs 目录下。

- antdv 目录存放 pc 端组件，注意：无论是通用组件还是基于 antdv 二次封装的都放在该目录下。
- vant 目录存放移动端组件，（未搭建。有意向的同学可以自行模仿并实现构建打包逻辑。
- 具体的文档编写可以参考 [histoire](https://histoire.dev/examples/），也可以以[表格组件](docs/antdv/gpa-table.story.vue)为例，里面有对应注释解释文档编写
- 建议简单组件就单文件就好，复杂组件可以分为 2 个文件，一个作为示例，一个显示详细的文档。如[表格组件](docs/antdv/gpa-table.story.vue)
- 若是二次封装的组件，则需要导入使用到的组件库的样式，而且需要两份不同的，一份是编译后的 css，一份是未编译的 less 文件

> 待完善：
> 请注意，antdv 组件的前缀为 gpa，但是在组件所在目录不需要使用前缀，前缀仅在导出组件和使用组件时使用。
> vant 组件的前缀建议定义为 gpv，为什么需要区分呢，因为开发的时候我们需要使用 unplugin-vue-components 来自动引入 组件库 src 下的对应文件。
