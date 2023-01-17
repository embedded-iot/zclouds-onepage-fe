import React from 'react';
import { Form } from 'antd';
import {
  NOTIFICATION_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import TextEditor from 'components/Common/TextEditor';

export default function NotificationForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        configStatus: !!initialValues && !!initialValues.configStatus ? initialValues.configStatus : '',
      }}
      layout="vertical"
      {...restProps}
    >

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter title!',
          },
        ]}
      >
        <InputText placeholder="Title"  />
      </Form.Item>
      <Form.Item
        label="Vietnamese content"
        name="contentVietnamese"
        rules={[
          {
            required: true,
            message: 'Please enter Vietnamese content!',
          },
        ]}
      >
        <TextEditor />
      </Form.Item>
      <Form.Item
        label="English content"
        name="contentEnglish"
        rules={[
          {
            required: true,
            message: 'Please enter English content!',
          },
        ]}
      >
        <TextEditor />
      </Form.Item>
      <Form.Item
        label="Status"
        name="configStatus"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <DropdownSelect
          options={NOTIFICATION_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
