import React from 'react';
import { Button, Form, Input } from 'antd';

export default function WooCommerceForm({ onFinish }) {
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Store Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter store name!',
          },
        ]}
      >
        <Input placeholder={`Store Name`}/>
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
        <Input placeholder={`https://...`}/>
      </Form.Item>
      <Form.Item
        label="API Key:"
        name="apiKey"
        rules={[
          {
            required: true,
            message: 'Please enter API key!',
          },
        ]}
      >
        <Input placeholder={`...`}/>
      </Form.Item>
      <Form.Item
        label="API Pass"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter API pass!',
          },
        ]}
      >
        <Input placeholder={`...`}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Connect
        </Button>
      </Form.Item>
    </Form>
  )
}
