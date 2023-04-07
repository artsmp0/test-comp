import { withInstall } from '../utils';
import Time from './src/time.vue';

Time.name = 'GpaTime';

export const GpaTime = withInstall(Time);
export default GpaTime;

export * from './src/time';
