# 古珀业务组件库

基于 `ant-design-vue 3.x` 的一个公司内部组件库。

## 安装

```bash
npm install @gupoui/antdv
```

## 快速开始

### 配置按需引入

```bash
npm install unplugin-vue-components @vue/runtime-core -D
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

请注意：组件的前缀为 `gpa`

```vue
<template>
  <div class="page-wrapper">
    <GpaTime style="color: antiquewhite" :mode="'relative'" :step="1" :time="Date.now() - 30 * 1000" />
  </div>
</template>
```
