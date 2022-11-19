import React from 'react';
import { Form, Input } from 'antd';
import {
  ROLES_LABEL_VALUE_OPTIONS, STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function UserForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        role: '',
        ...initialValues,
      }}
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
        <InputText placeholder="User Name"  />
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
        <Input.Password placeholder="Password" />
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
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={ROLES_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
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
    </Form>
  )
}
