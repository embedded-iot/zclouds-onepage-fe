import React from 'react';
import { Button, Form } from 'antd';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import BoxHeader from 'components/Share/BoxHeader';

export default function FreshdeskForm({ onFinish = () => {}, initialValues = {}, }) {
  const buttonList = [
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  ];
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={{
        ...initialValues,
        timeZone: initialValues && initialValues.timeZone ? initialValues.timeZone : '',
      }}
    >
      <Form.Item>
        <BoxHeader
          title="Freshdesk Settings"
          description="Settings for freshdesk, default on all sellpage"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Freshdesk URL"
        name="freshdeskUrl"
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
        <InputText placeholder={`https://...`}/>
      </Form.Item>
      <Form.Item
        label="Freshdesk API TOKEN"
        name="freshdeskApiToken"
        rules={[
          {
            required: true,
            message: 'Please enter freshdesk API token!',
          },
        ]}
      >
        <InputText placeholder="Freshdesk API TOKEN" />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
