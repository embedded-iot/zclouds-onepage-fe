import React from 'react';
import { Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import { upload } from 'utils';
import { AdminProductsService } from 'services';
import ProductOptionsBox from './ProductOptionsBox';

export default function ProductOptionsForm({ form, productId, initialValues, ...restProps }) {
  const action = AdminProductsService.getUploadProductImageUrl(productId);
  const handleRemoveImage = (file) => {
    AdminProductsService.deleteProductImage(productId, file.id);
  }
  const handleProductOptionsChange = (options) => {
    form.setFieldsValue({
      productOptions: options,
    });
  }

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      // onValuesChange={onValuesChange}
      initialValues={{
        ...initialValues,
        imageFiles: upload.getFileListFromList((initialValues.convertedProductImages)),
        productOptions: AdminProductsService.buildProductOptions(initialValues.productOptions || []),
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Upload"
        name="imageFiles"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={action} onRemove={handleRemoveImage}/>
      </Form.Item>
      <Form.Item
        label="Product options"
        name="productOptions"
        valuePropName="productOptions"
      >
        <ProductOptionsBox onChange={handleProductOptionsChange}/>
      </Form.Item>
    </Form>
  )
}
