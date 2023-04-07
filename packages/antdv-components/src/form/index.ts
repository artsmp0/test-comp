import { withInstall } from '../utils';
import Form from './src/form.vue';

Form.name = 'GpaForm';

export const GpaForm = withInstall(Form);
export default GpaForm;

export * from './src/form';
export * from './src/hooks/use-form-config';

export type GpaFormInstance = InstanceType<typeof GpaForm>;
