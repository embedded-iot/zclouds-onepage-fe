import React from 'react';
import { Button, Form, Input, Switch } from 'antd';

export default function ShopifyForm({ onFinish, initialValues }) {
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        label="Domain:"
        name="name"
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
        name="apiPass"
        rules={[
          {
            required: true,
            message: 'Please enter API pass!',
          },
        ]}
      >
        <Input placeholder={`...`}/>
      </Form.Item>
      <Form.Item
        label="Auto sync orders"
        name="autoSyncOrders"
      >
        <Switch defaultChecked />;
      </Form.Item>
      <Form.Item
        label="Auto approve orders"
        name="autoApproveOrders"
      >
        <Switch defaultChecked />;
      </Form.Item>
      <Form.Item
        label="Auto sync tracking"
        name="autoSyncTracking"
      >
        <Switch defaultChecked />;
      </Form.Item>
      <Form.Item>
        <Button>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  )
}
