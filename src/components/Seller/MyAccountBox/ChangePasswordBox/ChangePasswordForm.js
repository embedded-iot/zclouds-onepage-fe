import React from 'react';
import { Button, Card, Form } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import lockIcon from 'images/lock_black_icon.svg';
import InputPassword from 'components/Common/InputPassword';

export default function ChangePasswordForm({ onFinish, initialValues }) {
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
      <Card title={<div className="my-account__card-title"><Icon src={lockIcon} width={20} height={20} />Change Password</div>}
            className="my-account__card"
            bordered={false}>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: 'Please enter old password!',
            },
          ]}
        >
          <InputPassword placeholder="Old Password" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please enter new password!',
            },
          ]}
        >
          <InputPassword placeholder="New Password" />
        </Form.Item>
      </Card>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
                         className="edit-store-form__button-list"
      />
    </Form>
  )
}
