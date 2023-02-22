import React from 'react';
import { Form } from 'antd';
import RadioSelect from 'components/Common/RadioSelect';
import { SellerStoresService } from 'services';
import './style.scss';


export default function CreateNewStoreForm({ form, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="create-new-store-form__wrapper"
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
        <RadioSelect options={SellerStoresService.getStoresTypesOptions()} />
      </Form.Item>
    </Form>
  )
}
