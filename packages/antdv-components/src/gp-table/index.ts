import { withInstall } from '@gupo/utils';

import Table from './src/table.vue';

Table.name = 'GpTable';

export const GpTable = withInstall(Table);
export default GpTable;

export * from './src/table';
