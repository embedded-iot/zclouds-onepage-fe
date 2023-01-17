import React from 'react';
import { Form } from 'antd';

import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import InputText from 'components/Common/InputText';

export default function ConfirmTransactionForm({ form, filters, resellersInput, onAutoCompleteInputChange, onAutoCompleteInputSelect, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Reseller"
        name="resellerInput"
        rules={[
          {
            required: true,
            message: 'Please select seller!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const existingStore = resellersInput.options.find(item => item.label === value || item.value === value);
              if (!value || existingStore) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Reseller is not existing!'));
            },
          }),
        ]}
      >
        <AutoCompleteInput name="userName"
                           value={resellersInput.value}
                           onChange={onAutoCompleteInputChange}
                           onSelect={onAutoCompleteInputSelect}
                           placeholder={"All sellers"}
                           options={resellersInput.options}
                           autoFilterOptions={false}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        >
        <InputText placeholder="Description" />
      </Form.Item>
    </Form>
  )
}
