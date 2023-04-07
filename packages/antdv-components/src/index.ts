import type { App } from 'vue';
import { GpaTable } from './table';
import { GpaTime } from './time';

export { GpaTable, GpaTime };

const components = [GpaTable, GpaTime];
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
