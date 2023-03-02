import React from 'react';
import { Button, Form } from 'antd';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import BoxHeader from 'components/Share/BoxHeader';
import SwitchButton from 'components/Common/SwitchButton';

export default function KlaviyoForm({ onFinish = () => {}, initialValues = {}, }) {
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
          title="Klaviyo Settings"
          description="Settings for Klaviyo"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Klaviyo Enable"
        name="klaviyoEnable"
        // valuePropName="checked"
      >
        <SwitchButton
          showLabel={true}
        />
      </Form.Item>
      <Form.Item
        label="Klaviyo Key"
        name="klaviyoKey"
        rules={[
          {
            required: true,
            message: 'Please enter Klaviyo key!',
          },
        ]}
      >
        <InputText placeholder="Klaviyo Key" />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
