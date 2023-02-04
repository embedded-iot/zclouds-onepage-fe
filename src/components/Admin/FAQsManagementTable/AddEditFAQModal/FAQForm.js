import React from 'react';
import { Form } from 'antd';
import {
  FAQ_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import TextEditor from 'components/Common/TextEditor';
import InputNumber from 'components/Common/InputNumber';

export default function FAQForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        state: !!initialValues && !!initialValues.state ? initialValues.state : '',
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Question"
        name="question"
        rules={[
          {
            required: true,
            message: 'Please enter question!',
          },
        ]}
      >
        <InputText placeholder="Question"  />
      </Form.Item>
      <Form.Item
        label="Answer"
        name="answer"
        rules={[
          {
            required: true,
            message: 'Please enter answer!',
          },
        ]}
      >
        <TextEditor />
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
        label="Status"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <DropdownSelect
          options={FAQ_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
