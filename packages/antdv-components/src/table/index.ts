import { withInstall } from '@gupo/common';
import Table from './src/table.vue';

Table.name = 'GpaTable';

export const GpaTable = withInstall(Table);
export default GpaTable;

export * from './src/table';
