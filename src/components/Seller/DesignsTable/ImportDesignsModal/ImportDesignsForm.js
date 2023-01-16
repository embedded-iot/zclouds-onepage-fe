import React from 'react';
import { Form } from 'antd';
import {
  DESIGN_LABEL_VALUE_OPTIONS, DESIGN_VALUES,
} from 'components/contants';
import RadioSelect from 'components/Common/RadioSelect';
import DraggerUploadBox from 'components/Common/DraggerUploadBox';
import { upload } from 'utils';

export default function ImportDesignsForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        type: DESIGN_VALUES._2D,
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
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
        label="File"
        name="file"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
        rules={[
          {
            required: true,
            message: 'Please select file!',
          },
        ]}
      >
        <DraggerUploadBox
          multiple={true}
          autoUpload={false}
        />
      </Form.Item>
    </Form>
  )
}
