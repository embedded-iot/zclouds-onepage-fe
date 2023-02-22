import React from 'react';
import { Form } from 'antd';
import {
  SYSTEM_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function SystemForm({ form, initialValues, configsOptions, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        configName: '',
        ...initialValues,
        status: !!initialValues && !!initialValues.configStatus ? initialValues.configStatus : '',
      }}
      layout="vertical"
      {...restProps}
    >

      <Form.Item
        label="Config Name"
        name="configName"
        rules={[
          {
            required: true,
            message: 'Please select config name!',
          },
        ]}
      >
        <DropdownSelect options={configsOptions} />
      </Form.Item>
      <Form.Item
        label="Config Value"
        name="configValue"
        rules={[
          {
            required: true,
            message: 'Please enter config value!',
          },
        ]}
      >
        <InputText placeholder="Config value"  />
      </Form.Item>
      <Form.Item
        label="Config Comment"
        name="configComment"
        rules={[
          {
            required: true,
            message: 'Please enter config comment!',
          },
        ]}
      >
        <InputText placeholder="Config comment"  />
      </Form.Item>
      <Form.Item
        label="Config Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={SYSTEM_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
