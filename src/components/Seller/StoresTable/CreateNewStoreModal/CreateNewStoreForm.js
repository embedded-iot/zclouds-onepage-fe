import React from 'react';
import { Form } from 'antd';
import { STORE_TYPE_LABEL_VALUE_OPTIONS } from 'components/contants';
import RadioSelect from 'components/Common/RadioSelect';
import './style.scss';


export default function CreateNewStoreForm({ form, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="import-orders-form__wrapper1"
      {...restProps}
    >
      <Form.Item
        name="key"
        rules={[
          {
            required: true,
            message: 'Please select store type!',
          },
        ]}
      >
        <RadioSelect options={STORE_TYPE_LABEL_VALUE_OPTIONS} />
      </Form.Item>
    </Form>
  )
}
