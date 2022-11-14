import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import { upload } from 'utils';

export default function CategoryForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: '',
        avatarFileList: upload.getFileListFromList(initialValues && initialValues.featureImage ? [initialValues.featureImage] : []),
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Category name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter category name!',
          },
        ]}
      >
        <Input placeholder="Category name"  />
      </Form.Item>
      <Form.Item
        label="Upload"
        name="avatarFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox maxFileUpload={1}/>
      </Form.Item>
      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
        ]}
      >
        <Input placeholder="Slug" />
      </Form.Item>
      <Form.Item
        label="Display order"
        name="displayOrder"
        rules={[
          {
            required: true,
            message: 'Please enter display order!',
          },
        ]}
      >
        <InputNumber min={0} placeholder="Display order"  />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
