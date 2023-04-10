import { withInstall } from '../utils';
import Form from './src/form.vue';

Form.name = 'GpaForm';

export const GpaForm = withInstall(Form);

export * from './src/form';
export * from './src/hooks';

export type GpaFormInstance = InstanceType<typeof GpaForm>;

export default GpaForm;
