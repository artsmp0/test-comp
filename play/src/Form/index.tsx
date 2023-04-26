/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormConfig } from '@gupo/antdv-components/src/form/index';
import { Button, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';
import { LoadingOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons-vue';

export const useDataSync = (params: any) => {
  const form = useFormConfig(
    {
      input: '',
      password: '',
      customLabel: '',
      textarea: '',
      inputNumber: '',
      select: ['zhejiang'],
      checkbox: undefined,
      radio: undefined,
      switch: 1,
      datePicker: '',
      rangePicker: [],
      timePicker: '',
      timeRangePicker: [],
      rate: 2,
      slider: 0.3,
      treeSelect: undefined,
      upload: undefined,
      uploadList: [],
      uploadList2: [],
      uploadList3: undefined,
      dragger: undefined,
      custom: '123',
      cascader: undefined,
      xxxxx: '',
    },
    [
      {
        key: 'xxxxx',
        type: 'input',
        label: '无敌',
      },
      {
        key: 'input',
        type: 'input',
        label: '输入框',
        formItemProps: {
          labelAlign: 'right',
        },
      },
      {
        key: 'password',
        type: 'inputPassword',
        label: '密码框',
        props: {
          autocomplete: 'off',
        },
      },
      {
        key: 'textarea',
        type: 'textarea',
        label: '文本框',
        props: {
          autocomplete: 'off',
          autoSize: {
            minRows: 3,
            maxRows: 5,
          },
        },
      },
      {
        key: 'inputNumber',
        type: 'inputNumber',
        label: '数字输入',
        props: {
          prefix: '$' as any,
          min: 0,
          max: 100,
          formatter(value) {
            return `${value}%`;
          },
        },
      },
      {
        key: 'select',
        type: 'select',
        label: '选择框',
        props: {
          options: [],
          mode: 'multiple',
          //! 鼠标滑动都会触发的垃圾 :P
          option: opt => {
            return <Tag color='blue'>{opt.label}</Tag>;
          },
          tagRender(props) {
            return props.label ? <Tag color='blue'>{props.label}</Tag> : '';
          },
        },
      },
      {
        key: 'checkbox',
        type: 'checkbox',
        label: '复选框',
        props: {
          options: [
            {
              label: 'Apple',
              value: 'Apple',
            },
            {
              label: 'Pear',
              value: 'Pear',
            },
          ],
        },
      },
      {
        key: 'radio',
        type: 'radioGroup',
        label: '单选框',
        props: {
          optionType: 'button',
          buttonStyle: 'solid',
          options: [
            {
              label: 'Apple',
              value: 'Apple',
            },
            {
              label: 'Pear',
              value: 'Pear',
            },
          ],
        },
      },
      {
        key: 'switch',
        type: 'switch',
        label: '开关',
        props: {
          checkedValue: '1',
          unCheckedValue: '2',
        },
      },
      {
        key: 'datePicker',
        type: 'datePicker',
        label: '日期选择',
        props: {
          defaultValue: dayjs('2023-04-16'),
        },
      },
      {
        key: 'rangePicker',
        type: 'rangePicker',
        label: '日期范围选择',
        props: {
          defaultValue: [dayjs('2023-04-16'), dayjs('2023-04-18')],
        },
      },
      {
        key: 'timePicker',
        type: 'timePicker',
        label: '时间选择',
        props: {
          // defaultValue: dayjs('18:00'),
        },
      },
      {
        key: 'timeRangePicker',
        type: 'timeRangePicker',
        label: '时间范围选择',
        props: {
          // defaultValue: [dayjs('18:00'), dayjs('18:38')],
        },
      },
      {
        key: 'rate',
        type: 'rate',
        label: '评分',
      },
      {
        key: 'slider',
        type: 'slider',
        label: '进度',
      },
      {
        key: 'cascader',
        type: 'cascader',
        label: '级联选择',
        props: {
          showSearch: true,
          changeOnSelect: true,
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                },
              ],
            },
          ],
        },
      },
      {
        key: 'treeSelect',
        label: '树选择',
        type: 'treeSelect',
        props: {
          treeDefaultExpandAll: true,
          treeData: [
            {
              title: 'parent 1',
              value: 'parent 1',
              children: [
                {
                  title: 'parent 1-0',
                  value: 'parent 1-0',
                  children: [
                    {
                      title: 'my leaf',
                      value: 'leaf1',
                    },
                    {
                      title: 'your leaf',
                      value: 'leaf2',
                    },
                  ],
                },
                {
                  title: 'parent 1-1',
                  value: 'parent 1-1',
                },
              ],
            },
          ],
        },
      },
      {
        key: 'uploadList',
        label: '图片上传',
        type: 'upload',
        props: {
          // uploadContent: '上传', //方式一
          // uploadContent: () => <div>上传</div>, //方式二
          uploadContent: (
            <div>
              <span>自定义样式 </span>
              <Button>上传文件</Button>
            </div>
          ),
          name: 'file',
          action: 'http://10.123.234.66:20060/api/upload',
        },
      },
      {
        key: 'uploadList2',
        label: '头像上传',
        type: 'upload',
        props: {
          uploadContent: () => {
            if (params.imageUrl) {
              return <img src={params.imageUrl} alt='avatar' style={{ height: '100%' }} />;
            } else {
              return (
                <div>
                  {params.uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div class='ant-upload-text'>上传图片</div>
                </div>
              );
            }
          },
          name: 'file',
          action: 'http://10.123.234.66:20060/api/upload',
          listType: 'picture-card',
          showUploadList: false,
          accept: 'image/*',
          maxCount: 1,
          onChange: (info: any) => {
            console.log('info: ', info);
          },
        },
      },
      {
        key: 'uploadList3',
        label: '多图片上传',
        type: 'upload',
        props: {
          uploadContent: () => (
            <div>
              <PlusOutlined />
              <div class='ant-upload-text'>上传图片</div>
            </div>
          ),
          name: 'file',
          action: 'http://10.123.234.66:20060/api/upload',
          listType: 'picture-card',
          multiple: true,
        },
      },
      {
        key: 'dragger',
        label: '文件拖拽上传',
        type: 'uploadDragger',
        props: {
          uploadContent: () => (
            <div>
              <p class='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p class='ant-upload-text'>单击或将文件拖动到此区域以上传</p>
              <p class='ant-upload-hint'>文件提示</p>
            </div>
          ),
          name: 'file',
          action: 'http://10.123.234.66:20060/api/upload',
          multiple: true,
        },
      },
      {
        key: 'custom',
        type: 'custom',
        label: '自定义',
        component: (props: any) => (
          <input type='text' value={props.modelValue} onChange={(e: any) => props['onUpdate:modelValue'](e.target?.value)} placeholder={'我是自定义的'} />
        ),
      },
      // // 配置按钮
      {
        type: 'operation',
        key: 'operation',
        submitButton: {
          text: '提交',
          props: {
            type: 'primary',
          },
        },
        cancelButton: {
          text: '取消',
          props: {
            danger: true,
          },
        },
      },
    ],
    {
      select: {
        required: true,
        message: '请选择城市',
      },
    }
  );
  return form;
};
