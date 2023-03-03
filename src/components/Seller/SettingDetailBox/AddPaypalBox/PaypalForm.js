import React from 'react';
import { Button, Form } from 'antd';
import InputPassword from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function PaypalForm({ onFinish = () => {},  onCancel = () => {}, }) {
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
          title="Add Paypal Express Checkout"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Name / Email"
        name="nameEmail"
      >
        <InputText placeholder="Name / Email" />
      </Form.Item>
      <Form.Item
        label="Client ID"
        name="clientID"
      >
        <InputText placeholder="Client ID"  />
      </Form.Item>

      <Form.Item
        label="Secret"
        name="secret"
      >
        <InputPassword placeholder="Secret" />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
