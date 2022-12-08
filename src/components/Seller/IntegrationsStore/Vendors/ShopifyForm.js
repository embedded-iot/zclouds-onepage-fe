import React from 'react';
import { Button, Form } from 'antd';
import InputText from 'components/Common/InputText';
import Icon from 'components/Common/Icon';
import connectIcon from 'images/connect-icon.svg';

export default function ShopifyForm({ onFinish }) {
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Store name:"
        name="name"
      >
        <InputText placeholder={`Store name`}/>
      </Form.Item>
      <Form.Item
        label="Domain:"
        name="domain"
        rules={[
          {
            required: true,
            message: 'Please enter domain!',
          },
        ]}
      >
        <InputText addonBefore="https://" addonAfter=".myshopify.com" placeholder={`...`}/>
      </Form.Item>
      <Form.Item
        label="API Key:"
        name="apiKey"
      >
        <InputText placeholder={`...`}/>
      </Form.Item>
      <Form.Item
        label="API Pass:"
        name="password"
      >
        <InputText placeholder={`...`}/>
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
