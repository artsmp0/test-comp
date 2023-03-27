import { defineSetupVue3 } from '@histoire/plugin-vue';
import GupoAntdv from '@gupo/antdv-components';
import 'ant-design-vue/dist/antd.variable.min.css';
import '../packages/antdv-components/src/gp-table/style';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(GupoAntdv);
});
