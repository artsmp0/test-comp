import { parallel, series } from 'gulp';
import { buildFull, clean } from './tasks';

export default series(clean, parallel(buildFull));
