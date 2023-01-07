import React, { useEffect, useState } from 'react';
import { Form, notification } from 'antd';
import ProductForm from './ProductForm';
import { AdminCategoriesService, AdminProductsService, BaseService } from 'services';
import { getCategoriesOptions } from 'services/Admin/CategoriesService';
import BoxCard from 'components/Share/BoxCard';

import "./style.scss";

export default function AddEditProductBox({ data, onOk, onCancel, redirectTo }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const getCategoriesFilter = () => {
    AdminCategoriesService.getCategories({ pageNum: 1, pageSize: 1000 }, response => {
      setCategoriesOptions(getCategoriesOptions(response.items));
    }, () => {}, true)
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  const handleOk = (values) => {
    const images = (values.imageFiles || []).map(imageFile => imageFile.response).filter(img => !!img.id);
    const productData = {
      name: values.name,
      slug: values.slug,
      price: values.price,
      featureImage: images.length ? images[0].fullSizePath : '',
      note: values.note,
      description: values.description,
      state: values.state,
      categoryId: values.categoryId,
      designUrl: values.designUrl,
      listImgId: images.map(image => image.id),
    }

    if (isEdit) {
      AdminProductsService.updateProduct(data.id, productData, product => {
        saveProductOptions(product.id, values, () => {
          notification.success({
            message: "Update product successful!",
          });
          onOk();
        })
      }, error => {
        console.log(error);
        notification.error({
          message: BaseService.getErrorMessage(error,"Update product failure!"),
        });
      })
    } else {
      AdminProductsService.createProduct(productData, product => {
        saveProductOptions(product.id, values, () => {
          notification.success({
            message: "Create product successful!",
          });
          onOk();
        })
      }, error => {
        console.log(error);
        notification.error({
          message: BaseService.getErrorMessage(error,"Create product failure!" ),
        });
      })
    }
  }

  const saveProductOptions = (id, values, successCallback) => {
    const { productOptions = [] } = values;
    AdminProductsService.updateProductOptions(id, productOptions, response => {
      successCallback();
    }, error => {
      console.log(error);
      notification.error({
        message: BaseService.getErrorMessage(error,"Update product options failure!" ),
      });
    })
  }

  return (
    <BoxCard className={'add-edit-product-box__wrapper'}>
      <ProductForm form={form}
                   isEdit={isEdit}
                   initialValues={data}
                   categoriesOptions={categoriesOptions}
                   onCancel={onCancel}
                   onFinish={handleOk}
                   redirectTo={redirectTo}
      />
    </BoxCard>
  )
}
