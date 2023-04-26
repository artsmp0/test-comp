/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleObject } from 'ant-design-vue/es/form';
import { reactive, shallowReactive } from 'vue';
import type { ItemConfigs } from '../form';

export function useFormConfig<Models extends object, Key extends keyof Models, Configs extends ItemConfigs<Key | 'operation'>>(
  models: Models,
  configs: Configs,
  rules?: { [P in keyof Models]?: RuleObject | RuleObject[] }
) {
  const reactiveModel = reactive(models);
  const initModels = { ...models };
  const reactiveConfigs = shallowReactive(configs);
  const updateModel = (newModels: Partial<Models>) => {
    Object.assign(reactiveModel, newModels);
  };

  const reset = () => {
    updateModel(initModels);
  };
  // TODO 类型优化
  const updateConfigs = <K extends Key>(key: K, newConfig: any) => {
    const target = reactiveConfigs.find(c => c.key === key);
    const idx = reactiveConfigs.findIndex(c => c.key === key);
    if (!target) return;
    (reactiveConfigs as unknown as any[]).splice(idx, 1, {
      ...target,
      ...newConfig,
      props: { ...target.props, ...newConfig.props },
    });
  };

  return {
    models: reactiveModel,
    rules,
    configs: reactiveConfigs,
    updateModel,
    updateConfigs,
    reset,
  };
}
