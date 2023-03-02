import React from 'react';
import { Button, Divider, Form } from 'antd';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';
import InputText from 'components/Common/InputText';
import DropdownSelect from 'components/Common/DropdownSelect';
import { TIMEZONE_STATE_LABEL_VALUE_OPTIONS } from 'components/contants';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function UserSettingForm({ onFinish = () => {}, initialValues = {}, }) {
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
          title="Change Password"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          validatePassword
        ]}
      >
        <InputPassword placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue('password') || value === getFieldValue('password')) {
                return Promise.resolve();
              } else if (value && value !== getFieldValue('password')) {
                return Promise.reject(new Error('Confirm password is not matching!'));
              }
              return Promise.reject(new Error('Please enter password again!'));
            },
          }),
          validatePassword
        ]}
      >
        <InputPassword placeholder="Confirm password" />
      </Form.Item>
      <Divider />
      <Form.Item>
        <BoxHeader
          title="Account information"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Email is invalid!',
          },
          {
            required: true,
            message: 'Please enter email!',
          },
        ]}
      >
        <InputText disabled placeholder="Email"/>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
      >
        <InputText placeholder="Name"  />
      </Form.Item>
      <Form.Item
        label="Time zone"
        name="timeZone"
      >
        <DropdownSelect
          options={TIMEZONE_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
