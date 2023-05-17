import type { App } from 'vue';
import { GpaTable } from './table';
import { GpaTime } from './time';
import { GpaForm } from './form';
import { GpaEllipsis } from './ellipsis';

export { GpaTable, GpaTime, GpaForm, GpaEllipsis };

const components = [GpaTable, GpaTime, GpaForm, GpaEllipsis];
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
