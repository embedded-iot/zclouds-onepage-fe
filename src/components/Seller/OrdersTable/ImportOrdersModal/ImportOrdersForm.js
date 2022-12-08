import React from 'react';
import { Form } from 'antd';
import DraggerUploadBox from 'components/Common/DraggerUploadBox';
import { upload } from 'utils';

import './style.scss';


export default function ImportOrdersForm({ form, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="import-orders-form__wrapper"
      {...restProps}
    >
      <Form.Item>
        <div className='import-orders-form__label'>
          Required to upload <span className='import-orders-form__label--red'>*.csv; *.xls; *.xlsx</span> file according to the <span className='import-orders-form__label--green'>Order 2D template</span> or <span className='import-orders-form__label--green'>Order 3D template</span>
        </div>
        <div className='import-orders-form__label'>
          List SKU: <span className='import-orders-form__label--link'>https://fulfill.com/sku</span>
        </div>
        <div className='import-orders-form__label'>
          Guide: <span className='import-orders-form__label--link'>https://fulfill.com/blog/import-order-by-csv-exel-files</span>
        </div>
        <div className='import-orders-form__label'>
          <span className='import-orders-form__label--red'>*Note:</span> Please read the instructions carefully before importing the file
        </div>
      </Form.Item>
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
        rules={[
          {
            required: true,
            message: 'Please select file!',
          },
        ]}
      >
        <DraggerUploadBox />
      </Form.Item>
    </Form>
  )
}
