import React from 'react';
import { Form, notification } from 'antd';
import ProductForm from './ProductForm';
import { BaseService, SellerProductsService } from 'services';
import PageContentBox from 'components/Share/PageContentBox';

import "./style.scss";

export default function AddEditProductBox({ pageTitle, data, onOk, onCancel, redirectTo }) {
  const [form] = Form.useForm();
  const isEdit = !!data;

  const handleOk = (values) => {
    const images = (values.imageFiles || []).map(imageFile => ({
      url: imageFile.response ? imageFile.response.url : '',
    })).filter(img => !!img.url);
    const productData = {
      title: values.title,
      images,
      supportEmail: values.supportEmail,
      variants: values.variants.map(variant => {
        const { image, defaultPrice, comparedPrice, productCost, fulfillmentCost, sku, options } = variant;
        return {
          image,
          defaultPrice,
          comparedPrice,
          sku,
          productCostInfo: {
            productCost,
            fulfillmentCost,
          },
          options: options.map(optionItem => ({
            name: optionItem.name,
            value: optionItem.value,
          })),
        }
      }),
    }
    // console.log(productData);
    // return;
    if (isEdit) {
      SellerProductsService.updateProduct(data.id, productData, product => {
        notification.success({
          message: "Update product successful!",
        });
        onOk();
      }, error => {
        console.log(error);
        notification.error({
          message: BaseService.getErrorMessage(error,"Update product failure!"),
        });
      })
    } else {
      SellerProductsService.createProduct(productData, product => {
        notification.success({
          message: "Create product successful!",
        });
        onOk();
      }, error => {
        console.log(error);
        notification.error({
          message: BaseService.getErrorMessage(error,"Create product failure!" ),
        });
      })
    }
  }

  return (
    <PageContentBox
      title={pageTitle}
      goBack={onCancel}
    >
      <ProductForm form={form}
                   isEdit={isEdit}
                   initialValues={data}
                   onCancel={onCancel}
                   onFinish={handleOk}
                   redirectTo={redirectTo}
      />
    </PageContentBox>
  )
}
