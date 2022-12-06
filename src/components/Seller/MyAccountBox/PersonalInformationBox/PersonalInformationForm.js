import React from 'react';
import { Button, Card, Form } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import InputText from 'components/Common/InputText';
import userIcon from 'images/user_black_icon.svg';

export default function PersonalInformationForm({ onFinish, initialValues }) {
  const buttonList = [
    <Button type="primary" htmlType="submit">
      Save
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
      <Card title={<div className="my-account__card-title"><Icon src={userIcon} width={24} height={24} /><span>Personal Information</span></div>}
            className="my-account__card"
            bordered={false}>
        <Form.Item
          label="Full Name"
          name="fullName"
        >
          <InputText placeholder="Full Name"  />
        </Form.Item>
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter user name!',
            },
          ]}
        >
          <InputText disabled placeholder="User Name"  />
        </Form.Item>
        <Form.Item
          label="Telegram ID"
          name="telegramID"
        >
          <InputText placeholder="Telegram ID"/>
        </Form.Item>
        <Form.Item
          label="Email Address"
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
          <InputText placeholder="Email"/>
        </Form.Item>
        <Form.Item
          label="Phone Contact"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please enter phone!',
            },
          ]}
        >
          <InputText placeholder="Phone" />
        </Form.Item>
      </Card>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  )
}
