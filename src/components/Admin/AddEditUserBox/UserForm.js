import React from 'react';
import { Button, Form } from 'antd';
import {
  ROLES_LABEL_VALUE_OPTIONS, STATE_LABEL_VALUE_OPTIONS, STATE_VALUES,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import InputPassword from 'components/Common/InputPassword';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

export default function UserForm({ form, isEdit, role, initialValues, onFinish, ...restProps }) {
  const buttonList = [
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  ]
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        role: role || '',
        state: STATE_VALUES.ACTIVATED,
        ...initialValues,
      }}
      onFinish={onFinish}
      layout="vertical"
      {...restProps}
    >
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
        <InputText disabled={isEdit} placeholder="User Name"  />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter password!',
          },
        ]}
      >
        <InputPassword placeholder="Password" />
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
        <InputText placeholder="Email"/>
      </Form.Item>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please first name!',
          },
        ]}
      >
        <InputText placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please last name!',
          },
        ]}
      >
        <InputText placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          {
            required: true,
            message: 'Please full name!',
          },
        ]}
      >
        <InputText placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please enter phone!',
          },
        ]}
      >
        <InputText placeholder="Phone" />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'Please select role!',
          },
        ]}
      >
        <DropdownSelect
          disabled={role && !isEdit}
          options={ROLES_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        hidden={!isEdit}
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  )
}
