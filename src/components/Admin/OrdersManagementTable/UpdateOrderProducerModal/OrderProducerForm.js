import React from 'react';
import { Form } from 'antd';

import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import InputText from 'components/Common/InputText';

export default function OrderProducerForm({ form, filters, producersInput, onAutoCompleteInputChange, onAutoCompleteInputSelect, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Producer"
        name="producerInput"
        rules={[
          {
            required: true,
            message: 'Please select producer!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const existingStore = producersInput.options.find(item => item.label === value || item.value === value);
              if (!value || existingStore) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Producer is not existing!'));
            },
          }),
        ]}
      >
        <AutoCompleteInput name="producerId"
                           value={producersInput.value}
                           onChange={onAutoCompleteInputChange}
                           onSelect={onAutoCompleteInputSelect}
                           placeholder={"All Producers"}
                           options={producersInput.options}
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
