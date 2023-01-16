import React from 'react';
import { Form } from 'antd';
import DraggerUploadBox from 'components/Common/DraggerUploadBox';
import { upload } from 'utils';
import OrderDataRowsTable from './OrderDataRowsTable';
import { getFrontUserUrl } from 'services/BaseService';
import { SellerSystemService } from 'services';
import { SYSTEM_CONFIG_VALUE } from 'components/contants';

import './style.scss';


export default function ImportOrdersForm({ form, systemConfigs, orderDataRows, onFileChange, ...restProps }) {
  const handleValuesChange = (value, values) => {
    onFileChange(value.file && value.file.length ? value.file[0] : null);
  }
  const skuLink = getFrontUserUrl() + '/sku';
  const guildLink = getFrontUserUrl() + '/blog/import-order-by-csv-exel-files';
  const order2DTemplateLink = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.ADMIN_ORDER_2D_TEMPLATE);
  const order3DTemplateLink = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.ADMIN_ORDER_3D_TEMPLATE);

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="import-orders-form__wrapper"
      onValuesChange={handleValuesChange}
      {...restProps}
    >
      <Form.Item>
        <div className='import-orders-form__label'>
          Required to upload <span className='import-orders-form__label--red'>*.csv; *.xls; *.xlsx</span> file according to the <span className='import-orders-form__label--green'><a href={order2DTemplateLink} target='_blank' rel='noreferrer'>Order 2D template</a></span> or <span className='import-orders-form__label--green'><a href={order3DTemplateLink} target='_blank' rel='noreferrer'>Order 3D template</a></span>
        </div>
        <div className='import-orders-form__label'>
          List SKU: <span className='import-orders-form__label--link'><a href={skuLink} target='_blank' rel='noreferrer'>{skuLink}</a></span>
        </div>
        <div className='import-orders-form__label'>
          Guide: <span className='import-orders-form__label--link'><a href={guildLink} target='_blank' rel='noreferrer'>{guildLink}</a></span>
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
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!orderDataRows.length && getFieldValue('file').length) {
                return Promise.reject(new Error('Order data rows are empty, please select valid file!'));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <DraggerUploadBox autoUpload={false} maxCount={1} />
      </Form.Item>
      <Form.Item
        hidden={!orderDataRows.length}
      >
        <OrderDataRowsTable items={orderDataRows} />
      </Form.Item>
    </Form>
  )
}
