import { useResizeObserver } from '@vueuse/core';
import type { FormInstance } from 'ant-design-vue';
import type { CSSProperties, Ref } from 'vue';
import { computed, onActivated, onDeactivated, onMounted, ref, shallowRef, watch } from 'vue';
import type { GpaFormProps, ItemConfig } from '../form';

/**
 * 搜索表单相关的处理逻辑
 */
export function useSearchForm(props: GpaFormProps, $form: Ref<FormInstance | undefined>) {
  const defaultHeight = 64;
  const emptyBoxCount = ref(1);
  const itemConfigs = shallowRef<ItemConfig[]>([]);

  watch(
    () => props.itemConfigs,
    v => {
      if (!props.searchBar) {
        itemConfigs.value = props.itemConfigs;
        return;
      }
      let newConfig = v.map(item => {
        return {
          ...item,
          props: {
            ...item.props,
            style: {
              width: '100%',
            },
          },
        } as ItemConfig;
      });
      newConfig = newConfig.concat(new Array(emptyBoxCount.value).fill({ key: '', type: 'custom', component: () => <div></div> }));
      itemConfigs.value = newConfig;
    },
    { immediate: true }
  );

  const isOpen = ref(typeof props.searchBar === 'object' ? props.searchBar.defaultOpen : false);
  const searchWrapperStyle = computed<CSSProperties>(() => {
    if (props.searchBar) {
      return { height: isOpen.value ? `${boxHeight.value}px` : `${defaultHeight}px` };
    }
    return {};
  });
  const searchLayout = computed(() => {
    return props.searchBar ? 'inline' : props.layout;
  });

  const isShowToggleBtn = ref(true); // 控制切换按钮显示隐藏
  const searchBoxWidth = ref(0); // 控制 searchBar 的宽度：保证能遮挡住一个 form-item
  const boxHeight = ref(defaultHeight); // 控制 searchBar 的高度

  const controlObserver = ref(false); // 解决组件失活报错的问题
  onDeactivated(() => {
    controlObserver.value = true;
  });
  onActivated(() => {
    controlObserver.value = false;
  });
  onMounted(() => {
    if (!props.searchBar) return;
    useResizeObserver($form.value?.$el, entries => {
      if (controlObserver.value) return;
      const { borderBoxSize, target } = entries[0]!;
      if (!borderBoxSize?.[0]) return;
      // 取整，这个 blockSize 可能为小数
      boxHeight.value = Math.round(borderBoxSize![0].blockSize);
      if (boxHeight.value === defaultHeight) {
        // 如果相等说明只有一行，不需要显示『展开』『收起』按钮
        isShowToggleBtn.value = false;
      } else {
        isShowToggleBtn.value = true;
      }

      // 获取到盒子每一项的宽度，用于操作区域遮挡作用
      searchBoxWidth.value = (target.firstElementChild as HTMLDivElement).offsetWidth;
      // 计算一行有多少盒子
      const lineItemCount = Math.floor(borderBoxSize![0].inlineSize / searchBoxWidth.value);
      // 总的盒子数量
      const totalCount = target.children.length - emptyBoxCount.value;
      // 需要补充的空白盒子数量，默认需要有一个空白盒子占位
      emptyBoxCount.value = totalCount % lineItemCount === 0 ? 1 : lineItemCount - (totalCount % lineItemCount) + 1;
    });
  });

  return {
    itemConfigs,
    isOpen,
    searchWrapperStyle,
    searchLayout,
    isShowToggleBtn,
    searchBoxWidth,
  };
}
