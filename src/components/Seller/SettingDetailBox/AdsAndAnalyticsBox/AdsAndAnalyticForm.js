import React from 'react';
import { Button, Divider, Form } from 'antd';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function AdsAndAnalyticForm({ onFinish = () => {}, initialValues = {}, }) {
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
      <Form.Item
        label="Custom Script"
        name="customScript"
      >
        <InputText type="TextArea"
                   placeholder="Custom Script"
                   rows={4}
        />
      </Form.Item>
      <Form.Item>
        <span className='general-setting-box__note'>Script only apply when sellpages rebuild</span>
      </Form.Item>
      <Form.Item>
        <Divider />
      </Form.Item>
      <Form.Item
        label="Google Analytic ID"
        name="googleAnalyticId"
      >
        <InputText placeholder="Google Analytic ID"
        />
      </Form.Item>
      <Form.Item>
        <span className='general-setting-box__note'>Separate with commas (,) to add multiple GA ids</span>
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
