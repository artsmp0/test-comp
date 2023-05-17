import { defineSetupVue3 } from '@histoire/plugin-vue';
import GupoAntdv from '@gupoui/antdv';
// 需要引入 antd 的 css
import 'ant-design-vue/dist/antd.variable.min.css';
// 需要引入 vant 的 css
import 'vant/lib/index.css';
// 引入咱们的 css
import '../packages/antdv-components/src/index.less';
import './src/main.css';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(GupoAntdv);
});
