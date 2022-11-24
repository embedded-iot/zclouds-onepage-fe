import React from 'react';
import { Button, Form } from 'antd';
import InputText from 'components/Common/InputText';
import Icon from 'components/Common/Icon';
import connectIcon from 'images/connect-icon.svg';

export default function WooCommerceForm({ onFinish }) {
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Store Name:"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter store name!',
          },
        ]}
      >
        <InputText placeholder={`Store Name`}/>
      </Form.Item>
      <Form.Item
        label="Domain:"
        name="domain"
        rules={[
          {
            required: true,
            message: 'Please enter domain!',
          },
          {
            type: 'url',
            message: 'Url invalid!',
          },
        ]}
      >
        <InputText placeholder={`https://your-domain.com`}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary"
                htmlType="submit"
                icon={<Icon src={connectIcon} width={12} height={20} />}
        >
          Connect
        </Button>
      </Form.Item>
    </Form>
  )
}
