import { remove } from 'fs-extra';
import { antdvOutput, antdvOutputEs, antdvOutputLib } from '../utils';

export const clean = async () => {
  await Promise.all([remove(antdvOutput), remove(antdvOutputEs), remove(antdvOutputLib)]);
};
