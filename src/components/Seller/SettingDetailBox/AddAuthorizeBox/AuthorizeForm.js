import React from 'react';
import { Button, Form } from 'antd';
import InputPassword from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function AuthorizeForm({ onFinish = () => {},  onCancel = () => {}, }) {
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
        label="API LOGIN ID"
        name="clientId"
        rules={[
          {
            required: true,
            message: 'Please enter API login ID!',
          },
        ]}
      >
        <InputText placeholder="Client ID"  />
      </Form.Item>

      <Form.Item
        label="TRANSACTION KEY"
        name="secret"
        rules={[
          {
            required: true,
            message: 'Please enter traction key!',
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
