import React from 'react';
import { Button, Form } from 'antd';
import InputPassword from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function AirwallexForm({ onFinish = () => {},  onCancel = () => {}, }) {
  const buttonList = [
    <Button onClick={onCancel}>
      Discard
    </Button>,
    <Button type="primary" htmlType="submit">
      Add
    </Button>
  ];
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item>
        <BoxHeader
          title="AIRWALLEX"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Name / Email"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter payment name/email!',
          },
        ]}
      >
        <InputText placeholder="Name / Email" />
      </Form.Item>
      <Form.Item
        label="Client ID"
        name="clientId"
        rules={[
          {
            required: true,
            message: 'Please enter client ID!',
          },
        ]}
      >
        <InputText placeholder="Client ID"  />
      </Form.Item>

      <Form.Item
        label="API KEY"
        name="secret"
        rules={[
          {
            required: true,
            message: 'Please enter API key!',
          },
        ]}
      >
        <InputPassword placeholder="API KEY" />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
