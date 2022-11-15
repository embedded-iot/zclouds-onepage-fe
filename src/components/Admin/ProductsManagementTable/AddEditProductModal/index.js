import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ProductForm from './ProductForm';
import { AdminCategoriesService, AdminProductsService, BaseService } from 'services';
import { getCategoriesOptions } from 'services/Admin/CategoriesService';
import ProductOptionsForm from './ProductOptionsForm';

export default function AddEditProductModal({ open, data, onOk, onCancel }) {
  const [isAddOptionsProduct, setIsAddOptionsProduct] = useState(false);
  const [form] = Form.useForm();
  const isEdit = !!data;
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(data);
  const getCategoriesFilter = () => {
    AdminCategoriesService.getCategories({ pageNum: 1, pageSize: 1000 }, response => {
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
          message: BaseService.getErrorMessage(error,"Update product failure!"),
        });
      })
    } else {
      AdminProductsService.createProduct(values, response => {
        notification.success({
          message: "Create product successful!",
        });
        setSelectedProduct(response);
        goProductOptions(true);
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create product failure!" ),
        });
      })
    }
  }

  const saveProductOptions = () => {
    const { productOptions = [] } = form.getFieldsValue();
    AdminProductsService.updateProductOptions(selectedProduct.id, productOptions, response => {
      notification.success({
        message: "Update product options successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update product options failure!" ),
      });
    })
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
        initialValues={selectedProduct}
      />
    </ModalView>
  ) : (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Add product options"}
               cancelText={"Back"}
               okText={"Save"}
               onCancel={() => goProductOptions(false)}
               onOk={saveProductOptions}
    >
      <ProductOptionsForm
        form={form}
        productId={selectedProduct.id}
        initialValues={selectedProduct}
      />
    </ModalView>
  )
}
