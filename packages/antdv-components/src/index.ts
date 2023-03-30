import type { App } from 'vue';
import { GpaTable } from './gp-table';

export { GpaTable };

const components = [GpaTable];
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
