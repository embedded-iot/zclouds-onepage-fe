import React from 'react';
import { Button, Form, Input, Switch } from 'antd';

export default function ShopifyForm({ onFinish, onCancel, onReconnect, initialValues }) {
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        label="Platform:"
        name="platform"
        rules={[
          {
            required: true,
            message: 'Please enter API key!',
          },
        ]}
      >
        <Input disabled placeholder={`...`}/>
      </Form.Item>
      <Form.Item
        label="Store name:"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter store name!',
          },
        ]}
      >
        <Input placeholder={`Store name`}/>
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
        <Input disabled placeholder={`https://...`}/>
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
      <Form.Item
        label="Auto sync orders"
        name="autoSyncOrder"
        valuePropName="checked"
      >
        <Switch />;
      </Form.Item>
      <Form.Item
        label="Auto approve orders"
        name="autoApproveOrder"
        valuePropName="checked"
      >
        <Switch />;
      </Form.Item>
      <Form.Item
        label="Auto sync tracking"
        name="autoSyncTracking"
        valuePropName="checked"
      >
        <Switch />;
      </Form.Item>
      <Form.Item>
        <div className='edit-store__button-list'>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onReconnect}>
            Reconnect
          </Button>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
