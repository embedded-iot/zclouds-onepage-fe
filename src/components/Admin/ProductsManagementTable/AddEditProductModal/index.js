import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ProductForm from './ProductForm';
import { AdminCategoriesService, AdminProductsService } from 'services';
import { getCategoriesOptions } from 'services/Admin/CategoriesService';
import ProductOptionsForm from './ProductOptionsForm';

export default function AddEditProductModal({ open, data, onOk, onCancel }) {
  const [isAddOptionsProduct, setIsAddOptionsProduct] = useState(false);
  const [form] = Form.useForm();
  const isEdit = !!data;
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const getCategoriesFilter = () => {
    AdminCategoriesService.getCategories({ pageNum: 1, pageSize: 10000 }, response => {
      setCategoriesOptions(getCategoriesOptions(response.items));
    }, () => {}, true)
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  const goProductOptions = (show) => {
    setIsAddOptionsProduct(show)
  }

  const handleOk = (values) => {
    if (isEdit) {
      AdminProductsService.updateProduct(data.id, values, response => {
        notification.success({
          message: "Update product successful!",
        });
        goProductOptions(true);
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update product failure!",
        });
      })
    } else {
      AdminProductsService.createProduct(values, response => {
        notification.success({
          message: "Create product successful!",
        });
        goProductOptions(true);
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create product failure!",
        });
      })
    }

  }

  return !isAddOptionsProduct ? (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit product" : "Add product"}
               okText={"Continue"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ProductForm
        form={form}
        categoriesOptions={categoriesOptions}
        initialValues={data}
      />
    </ModalView>
  ) : (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Add product options"}
               cancelText={"Back"}
               onCancel={() => goProductOptions(false)}
               onOk={onCancel}
    >
      <ProductOptionsForm
        productId={data.id}
        initialValues={data}
      />
    </ModalView>
  )
}
