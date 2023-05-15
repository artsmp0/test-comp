<template>
  <Story group="top" docs-only icon="carbon:bookmark" title="开发指南" />
</template>

<docs lang="md">
# 业务组件库食用指南

> 仓库地址: https://codeup.aliyun.com/gupo/node-modules/gupo-components/tree/vue3-antdv

## 01-包管理

由于公司项目仅支持 `yarn`，所以采用 `yarn + lerna` 的包管理模式。

开发组件库时会涉及到的命令：

1. 子包之间相互引用：`lerna add @gupo/antdv-components --scope=play`，表示为 `play` 子包引用 `@gupo/antdv-components` 包。包名必须采用 package.json 文件中的 name 字段。
2. 安装依赖到根包：`yarn add -D -W vue`，表示安装 vue 这个包到根目录下的开发依赖中。
3. 安装依赖到对应子包：`yarn workspace @gupo/docs add @vitejs/plugin-vue-jsx -D`，表示安装依赖 `@vitejs/plugin-vue-jsx` 到 `@gupo/docs` 子包下。
4. 在包根目录下运行 `yarn` 或者 `yarn install` 命令，将会为根包和所有子包都安装上依赖，所有依赖包的 `node_modules` 都统一集合放在根包下。

`peerDependencies` 和 `dependencies` 的区别：在构建 es 或者 lib 包的时候，两者都会作为 rollup 的 external 排除掉，我们在安装该组件库的时候两者都会自动被安装上。但是在构建全量包，即 dist 下的文件的时候，dependencies 中的包会被打包到我们的全量包当中。在引入全量包之前，我们需要先引入 `peerDependencies` 中的包。但是我们基本上不会有构建全量包的场景，所以只要非开发依赖我们直接安装到 `dependencies` 下即可。

> 📌 在开发组件库包时，假使依赖于某个工具，请一定要安装为 `dependencies` ，即非开发依赖，否则在组件库构建的过程将会报错！

> 📌 还有就是禁止引入幽灵依赖：组件库中有引入的依赖，请务必安装，否则打包后目录会不对劲！

## 02-目录结构

### 整体结构

```bash
├── build                   # 构建脚本
│  ├── package.json
│  └── src
├── docs                    # 文档
│  ├── antdv                # antdv 业务组件文档目录
│  ├── components.d.ts
│  ├── histoire.config.ts
│  ├── histoire.setup.ts
│  ├── package.json
│  ├── shims.d.ts
│  ├── tsconfig.json
│  ├── vant                 # vant 业务组件文档目录
│  └── vite.config.ts
├── eslint-config           # eslint 配置
│  ├── index.js
│  └── package.json
├── lerna.json              # lerna 配置文件
├── package-lock.json
├── package.json
├── packages
│  └── antdv-components     # antdv 业务组件
├── play                    # 开发组件时使用，已经配置好直接引用源码，支持实时更新
│  ├── env.d.ts
│  ├── index.html
│  ├── main.ts
│  ├── package.json
│  ├── src
│  └── vite.config.ts
├── README.md
├── tsconfig.json
├── typings
│  └── components.d.ts      # 组件类型声明，指向开发时的组件，需要手动配置引入到 src/
└── yarn.lock
```

### 组件包目录结构

```bash
├── package.json
├── src                    # 源码目录
│  ├── table               # 单个组件文件
│  ├── index.less          # 组件包样式入口文件，需要引入所有组件的样式
│  ├── index.ts            # 组件库入口文件，导出所有组件
│  ├── resolver.ts         # 用于按需引入组件的解析器 unplugin-vue-components
│  └── utils               # 组件库用到的工具函数
└── tsconfig.json          # 组件库打包时的 ts 配置，用于输出类型声明文件
```

### 组件目录结构

```bash
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

## 03-如何添加一个组件？

此处以 antdv 的 `table` 组件为例，_更详细的内容请直接看组件源码_：

1. 在 `packages/antdv-components/src` 中新建一个 table 文件夹；
2. 在 `table` 文件夹中新建 `index.ts、style/css.ts、 style/index.ts、 style/index.less、 src/table.ts、 src/table.vue` 文件，以上列举的文件为必要文件；
3. 在 `table/index.ts` 中填入以下内容，给组件命名，以及导出组件、组件类型、组件工具函数等
4. 注意：无论是通用组件还是基于 antdv 二次封装的都放在该目录下。
5. vant 库：未搭建。有意向的同学可以自行模仿 `antdv` 并实现构建打包逻辑。
6. 若是二次封装的组件，则需要导入使用到的组件库的样式，而且需要两份不同的，一份是编译后的 css，一份是未编译的 less 文件，用于按需导入样式。
7. 每添加一个组件，都需要在 `packages/antdv-components/src/index.less` 中引入组件的样式，如：

```less
@import './gp-table/style/index.less';
// ...导出更多
```

8. 在 `packages/antdv-components/src/index.ts` 导出组件，如：

```tsx
import type { App } from 'vue';
import { GpaTable } from './table';
import { GpaTime } from './time';
import { GpaForm } from './form';

export { GpaTable, GpaTime, GpaForm };

const components = [GpaTable, GpaTime, GpaForm];
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

> 📌 待完善：
> 请注意，antdv 组件的前缀为 gpa，但是在组件所在目录不需要使用前缀，**前缀仅在导出组件和使用组件时使用。** > **vant 组件的前缀建议定义为 gpv**，为什么需要区分呢，因为开发的时候我们需要使用 unplugin-vue-components 来自动引入 组件库 src 下的对应文件。

## 04-组件库文档 - histoire

> 这是一篇快速入门的介绍！更详细的使用请查看[官方文档](https://histoire.dev/)

### 快速开始

1. 首先我们需要一个 vite + vue3 的项目
2. 运行安装命令：`yarn add -D histoire @histoire/plugin-vue`
3. 创建配置文件：`histoire.config.js` or `histoire.config.ts`

```jsx
import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
});
```

4. 进行完以上配置之后，在当前项目下所有 `xxx.story.vue` 类型的文件都会被 `hsitoire` 扫描。访问的路径就是文件路径

### 引入我们的组件库

1. 首先在配置中加入 `setupFile` ：

```ts
import { defaultColors, defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  **setupFile: './histoire.setup.ts',**
  //...
});
```

2. 安装业务组件库：

```bash
# 引入业务组件库
lerna add @gupo/antdv-components --scope=@gupo/docs
```

3. 编写 `histoire.setup.ts`

```ts
import { defineSetupVue3 } from '@histoire/plugin-vue';
import GupoAntdv from '@gupo/antdv-components';
import '../packages/antdv-components/src/index.less';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(GupoAntdv);
});
```

### 编写组件文档，以表格为例：

1. 新建 antdv 目录，该目录下存放所有基于 antdv 的组件
2. 新建 `gpa-table.story.vue` 文件：编写如下内容：
   1. `Story` 组件在 `histoire` 中表示一个文档页，其里可以包含多个 `Variant` 组件，每一个 `Variant` 组件则表示一个组件示例。
   2. `Story` 组件支持的 `props` 仅列出常用的：
      1. `title`：侧边栏页面标题，支持 `/` 分割，例如 `table/xxx table/bbb` ，将会自 动在侧边栏成组，当组件 API 复杂的情况下，建议将示例和文档分开，并使用这种路径成组。
      2. `icon`：侧边栏页面图标，支持 [iconify](https://icones.js.org/) 图标。复制图标名称即可
      3. `auto-props-disabled`：是否禁用自动扫描 props，默认开启。
      4. `docs-only` ：仅作为文档显示，复杂组件建议单独一个文档页，更清晰易懂
      5. `layout="{ type: 'single', iframe: true }”` ：默认采用 iframe 的方式进行组件示例的展示，可选 grid，建议二次封装的组件均采用 iframe 方式编写，以进行文档样式隔离。基础组件可以采用 `:layout="{ type: 'grid', width: 200 }"` 这种方式。
   3. `Variant` 组件支持的`props` ，仅列出常用的：
      1. `title`：组件示例名称
      2. `init-state`：接收一个函数，这个函数返回一些状态，可以通过两个插槽获取到这个数据。默认插槽（`default`）可以获取到初始状态：绑定后 `controls` 插槽中变更了状态则会实时响应组件更新。
   4. `controls` 插槽中的一些组件，主要用来实时改变 `props`，让组件动态响应变化，支持的控件列表请查看该链接：[https://controls.histoire.dev/](https://controls.histoire.dev/)。请注意解构后的 `props` 会失去响应式。

```ts
<script lang="ts" setup>
const getUser = (params: { pageSize: number; current: number }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: Array.from({ length: params.pageSize }).map((_, index) => ({
            name: `我是随机名字${index * params.current}`,
            age: index,
            male: index % 2 === 0,
          })),
          pagination: {
            total: 10000,
          },
        },
      });
    }, 1000);
  });
};
const columns = [
  {
    dataIndex: 'name',
    title: '姓名',
    helpMessage: '这是帮助消息',
  },
  {
    dataIndex: 'age',
    title: '年龄',
  },
  {
    dataIndex: 'male',
    title: '性别',
  },
  {
    dataIndex: 'operation',
    title: '操作',
    fixed: 'right',
    width: 150,
  },
];

function initState() {
  return {
    isWithParentHeight: true,
    title: '用户列表',
    isShowHeader: true,
    helpMessage: '用户列表头部帮助信息',
    // 'small' | 'middle' | 'large'
    size: 'large',
    isKeepPageReload: true,
  };
}
</script>

<template>
  <!-- auto-props-disabled：禁用自动生成 props，复杂组件建议禁用 -->
  <!-- title用 / 分割，histoire 会自动进行匹配成组 -->
  <!-- icon可以到 https://icones.netlify.app/ 上面去找，不写也可以 -->
  <!-- 一个 story 可以有多个 Variant 组件，我们可以定义一些常用的示例，以 Button 为例：可能会有：基本用法，图标按钮... -->
  <Story title="表格组件/演示" icon="material-symbols:table" auto-props-disabled>
    <!-- initState 必须要是一个函数，返回初始状态 -->
    <Variant title="playground" :init-state="initState">
      <!-- 默认插槽可以获取到初始状态：绑定后 controls 插槽中变更了状态则会实时响应组件更新 -->
      <template #default="{ state }">
        <div style="height: 100vh">
          <GpaTable
            :is-show-header="state.isShowHeader"
            :help-message="state.helpMessage"
            :title="state.title"
            :columns="columns as any"
            :is-with-parent-height="state.isWithParentHeight"
            :size="state.size"
            :list-api="getUser"
            :is-keep-page-reload="state.isKeepPageReload"
            :pagination-keys="{
              current: 'current',
              list: 'list',
              pageSize: 'pageSize',
              total: 'pagination.total',
            }"
          >
            <template #bodyCell="{ record, column }">
              <ATag v-if="column.dataIndex === 'male'" :color="record.male ? 'blue' : 'red'">{{
                record.male ? '男' : '女'
              }}</ATag>
              <template v-if="column.dataIndex === 'operation'">
                <ATag color="green">编辑</ATag>
                <ATag color="green">删除</ATag>
              </template>
            </template>
          </GpaTable>
        </div>
      </template>
      <!-- 可以针对 state 进行变更，请注意 props 响应式不能丢失才会起效果，例如此处的 表格尺寸 -->
      <!-- 对应的空间可以上 histoire 文档去查询 -->
      <template #controls="{ state }">
        <HstCheckbox v-model="state.isWithParentHeight" title="自适应父容器高度" />
        <HstCheckbox v-model="state.isShowHeader" title="显示头部" />
        <HstCheckbox v-model="state.isKeepPageReload" title="保持页码刷新" />
        <HstText v-model="state.title" title="表格标题" />
        <HstText v-model="state.helpMessage" title="表格标题帮助信息" />
        <HstSelect
          v-model="state.size"
          title="表格尺寸"
          :options="[
            { value: 'large', label: '默认' },
            { value: 'green', label: '中等' },
            { value: 'small', label: '紧凑' },
          ]"
        />
      </template>
    </Variant>
  </Story>
</template>
```

3. 复杂组件可以独立 API 为单独的一个页面，并使用路径匹配功能自动成组，新建 `gpa-table-md.story.vue` 文件：
</docs>
