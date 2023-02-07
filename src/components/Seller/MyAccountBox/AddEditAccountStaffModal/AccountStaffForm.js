import React from 'react';
import { Form } from 'antd';
import InputText from 'components/Common/InputText';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import {
  ROLE_VALUES,
  SELLER_STAFF_ROLES_LABEL_VALUE_OPTIONS,
  STATE_LABEL_VALUE_OPTIONS, STATE_VALUES,
} from 'components/contants';
import RadioSelect from 'components/Common/RadioSelect';

import './style.scss';

export default function AccountStaffForm({ isEdit = false, form, initialValues }) {
  const [, ...stateOptions] = STATE_LABEL_VALUE_OPTIONS;
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="account-staff-form__wrapper"
      initialValues={{
        state: STATE_VALUES.ACTIVATED,
        role: ROLE_VALUES.RESELLER,
        ...initialValues
      }}
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
        <InputText disabled placeholder="User Name"  />
      </Form.Item>
      {
        !isEdit && (
          <>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please enter password!',
                },
                validatePassword
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
              label="Phone"
              name="phone"
            >
              <InputText placeholder="Phone" />
            </Form.Item>
            <Form.Item
              label="Store Name"
              name="storeName"
              rules={[
                {
                  required: true,
                  message: 'Please enter store name!',
                },
              ]}
            >
              <InputText placeholder="Store Name"  />
            </Form.Item>
          </>
        )
      }
      <Form.Item
        label="Type"
        name="role"
        rules={[
          {
            required: true,
            message: 'Please select role!',
          },
        ]}
      >
        <RadioSelect
          options={SELLER_STAFF_ROLES_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      {
        isEdit && (
          <Form.Item
            label="Status"
            name="state"
            rules={[
              {
                required: true,
                message: 'Please select state!',
              },
            ]}
          >
            <RadioSelect
              options={stateOptions}
            />
          </Form.Item>
        )
      }
    </Form>
  )
}
