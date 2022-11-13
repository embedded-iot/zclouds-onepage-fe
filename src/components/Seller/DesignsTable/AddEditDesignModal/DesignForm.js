import React from 'react';
import { Form, Input } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  DESIGN_LABEL_VALUE_OPTIONS, DESIGN_VALUES,
} from 'components/contants';
import RadioSelect from 'components/Common/RadioSelect';
import { upload } from 'utils';

export default function DesignForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        type: DESIGN_VALUES._2D,
        designFileList: upload.getFileListFromList(initialValues && initialValues.design),
        mockFileList: upload.getFileListFromList(initialValues && initialValues.mock),
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Design name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter design name!',
          },
        ]}
      >
        <Input placeholder="Design name"  />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select type!',
          },
        ]}
      >
        <RadioSelect
          options={DESIGN_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <Form.Item
        label="Mockup"
        name="mockFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox />
      </Form.Item>
      <Form.Item
        label="Design"
        name="designFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox />
      </Form.Item>
    </Form>
  )
}
