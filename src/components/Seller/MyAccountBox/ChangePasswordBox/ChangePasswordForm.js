import React from 'react';
import { Button, Card, Form } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import saveIcon from 'images/save-icon.svg';
import settingIcon from 'images/setting-icon.svg';
import InputPassword from 'components/Common/InputPassword';

export default function ChangePasswordForm({ onFinish, initialValues }) {
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
          name="oldPassword"
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
