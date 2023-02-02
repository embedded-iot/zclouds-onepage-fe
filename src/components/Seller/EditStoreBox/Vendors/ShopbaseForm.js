import React from 'react';
import { Button, Card, Form, Switch } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import refreshIcon from 'images/refresh-icon.svg';
import saveIcon from 'images/save-icon.svg';
import InputText from 'components/Common/InputText';
import settingIcon from 'images/setting-icon.svg';
import './style.scss';

export default function ShopifyForm({ onFinish, onCancel, onReconnect, initialValues }) {
  const buttonList = [
    <Button type="primary" danger onClick={onCancel}>
      Cancel
    </Button>,
    <Button type="primary" ghost onClick={onReconnect} icon={<Icon src={refreshIcon} width={18} height={18} />} >
      Reconnect
    </Button>,
    <Button type="primary" htmlType="submit" icon={<Icon src={saveIcon} width={18} height={18} />} >
      Save Changes
    </Button>
  ]
  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Card title={<><Icon src={settingIcon} width={24} height={24} /> General Settings</>}
            className="edit-store-form__card"
            bordered={false}>
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
          <InputText disabled placeholder={`...`}/>
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
            {
              type: 'url',
              message: 'Url invalid!',
            },
          ]}
        >
          <InputText disabled placeholder={`https://...`}/>
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
          <InputText placeholder={`...`}/>
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
          <InputText placeholder={`...`}/>
        </Form.Item>
        <Form.Item
          label="Auto sync orders"
          name="autoSyncOrder"
          valuePropName="checked"
          className="edit-store-form__switch"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Auto approve orders"
          name="autoApproveOrder"
          valuePropName="checked"
          className="edit-store-form__switch"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Auto sync tracking"
          name="autoSyncTracking"
          valuePropName="checked"
          className="edit-store-form__switch"
        >
          <Switch />
        </Form.Item>
      </Card>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
                         className="edit-store-form__button-list"
      />
    </Form>
  )
}
