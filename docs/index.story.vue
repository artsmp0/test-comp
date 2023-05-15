<template>
  <Story group="top" docs-only icon="carbon:bookmark" title="快速开始" />
</template>

<docs lang="md">
# 古珀业务组件库

基于 `ant-design-vue 3.x` 的一个公司内部组件库。文档采用 [histoire](https://histoire.dev/) 作为支持, `cmd/ctrl + K` 支持搜索文档喔

## 安装

```bash
npm install @gupoui/antdv
# OR
pnpm install @gupoui/antdv
# OR
yarn add @gupoui/antdv
```

## 快速开始

### 配置按需引入

```bash
npm install unplugin-vue-components @vue/runtime-core -D
# OR
pnpm install unplugin-vue-components @vue/runtime-core -D
# OR
yarn add unplugin-vue-components @vue/runtime-core -D
```

在 `vite.config.*` 中进行配置：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { GupoAntdvResolver } from '@gupoui/antdv/lib/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components(
      /* options */
      {
        resolvers: [GupoAntdvResolver({ importStyle: 'less' })],
      }
    ),
  ],
});
```

### 使用

请注意：组件的前缀为 `gpa`，目前暂未支持修改前缀的功能（感觉也没必要。

```vue
<template>
  <div class="page-wrapper">
    <GpaTime style="color: antiquewhite" :mode="'relative'" :step="1" :time="Date.now() - 30 * 1000" />
  </div>
</template>
```
</docs>
