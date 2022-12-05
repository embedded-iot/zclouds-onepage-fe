import React from 'react';
import { Button, Card, Form } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import saveIcon from 'images/save-icon.svg';
import InputText from 'components/Common/InputText';
import settingIcon from 'images/setting-icon.svg';

export default function PersonalInformationForm({ onFinish, initialValues }) {
  const buttonList = [
    <Button type="primary" htmlType="submit" icon={<Icon src={saveIcon} width={18} height={18} />} >
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
      <Card title={<><Icon src={settingIcon} width={24} height={24} /> Personal Information</>}
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
          name="userName"
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
                         className="edit-store-form__button-list"
      />
    </Form>
  )
}
