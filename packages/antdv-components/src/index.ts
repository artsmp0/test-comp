import type { App } from 'vue';
import { GpTable } from './gp-table';

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
