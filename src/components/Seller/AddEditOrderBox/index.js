import React, { useEffect, useRef, useState } from 'react';
import { Form, notification } from 'antd';
import OrderForm from 'components/Seller/AddEditOrderBox/OrderForm';
import {
  BaseService, FrontUserCategoriesService,
  SellerDesignsService,
  SellerOrdersService,
  SellerStoresService,
} from 'services';
import BoxCard from 'components/Share/BoxCard';
import { getStoresOptions } from 'services/Seller/StoresService';
import { getDesignsOptions } from 'services/Seller/DesignsService';
import { getProductsOptions } from 'services/FrontUser/CategoriesService';
import { cui, download, format } from 'utils';
import { getShortPathImage } from 'services/BaseService';
import AddEditDesignModal from 'components/Seller/DesignsTable/AddEditDesignModal';

import './style.scss';

export default function AddEditOrderBox({ isEdit, data, onOk, onCancel, redirectTo }) {
  const [openAddDesign, setOpenAddDesign] = useState(false);
  // eslint-disable-next-line
  const defaultSelectedProduct = isEdit ? { ...data.product, sku: data.orderProductSku || (!!data.product && data.product.sku ? data.product.sku : '') } : {};
  const [selectedProduct, setSelectedProduct] = useState(defaultSelectedProduct);
  const [productInputValue, setProductInputValue] = useState('');
  const [productsOptions, setProductsOptions] = useState([]);
  const defaultStoresId = isEdit && data.store ? data.store.id : '';
  const [storeId, setStoreId] = useState(defaultStoresId);
  const defaultStoresInputValue = isEdit && data.store ? data.store.name : '';
  const [storesInputValue, setStoreInputValue] = useState(defaultStoresInputValue);
  const [storesOptions, setStoresOptions] = useState([]);
  const defaultDesignsInputValue = isEdit && data.design ? data.design.slug : '';
  const [designsInputValue, setDesignsInputValue] = useState(defaultDesignsInputValue);
  const defaultDesignId = isEdit && data.design ? data.design.id : '';
  const [designId, setDesignId] = useState(defaultDesignId);
  const [designsOptions, setDesignsOptions] = useState([]);
  const [form] = Form.useForm();
  let ref = useRef({});

  const getProducts = (params = {}) => {
    FrontUserCategoriesService.getCategories({ pageNum: 1, pageSize: 100, ...params }, response => {
      const newProductOptions = getProductsOptions(response.items, false);
      setProductsOptions(newProductOptions);
      if (!isEdit) {
        if (newProductOptions.length) {
          form.validateFields(['productSelectBox']);
        }
        setSelectedProduct(newProductOptions.length ? newProductOptions[0] : {})
      }
    }, () => {}, true)
  }

  const getStores = (params = {}) => {
    SellerStoresService.getStores({ pageNum: 1, pageSize: 100, ...params }, response => {
      setStoresOptions(getStoresOptions(response.items, false));
    }, () => {}, true)
  }

  const getDesigns = (params = {}) => {
    SellerDesignsService.getDesigns({ pageNum: 1, pageSize: 100, ...params }, response => {
      setDesignsOptions(getDesignsOptions(response.items, false));
    }, () => {}, true)
  }

  useEffect(() => {
    getProducts();
    getStores();
    getDesigns();
    // eslint-disable-next-line
  }, []);

  const handleOk = (values) => {
    const newData = cui.removeEmpty({
      productId: selectedProduct.id,
      orderProductSku: selectedProduct.sku,
      productName: values.productName,
      quantity: values.quantity,
      mockupUrl: getShortPathImage(values.mockupUrl),
      designUrl: getShortPathImage(values.designUrl),
      storeId: storeId,
      designId: designId,
      orderNumber: values.orderNumber,
      orderNote: values.orderNote,
      orderShipping: {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address1: values.address1,
        address2: values.address2,
        country: values.country,
        zipCode: values.zipCode,
        region: values.region,
        city: values.city,
      }
    });
    if (isEdit) {
      SellerOrdersService.updateOrder(data.id, newData, response => {
        notification.success({
          message: "Update order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update order failure!"),
        });
      })
    } else {
      SellerOrdersService.createOrder(newData, response => {
        notification.success({
          message: "Create order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create order failure!"),
        });
      })
    }
  }

  const handleInputChange = (value, name) => {
    if (name === "storeAutoCompleteInput") {
      setStoreInputValue(value);
      setStoreId('');
    } else if (name === "designSKUAutoCompleteInput") {
      setDesignsInputValue(value);
      setDesignId('');
    } else if (name === "productSelectBox") {
      setProductInputValue(value);
    }
    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      if (name === "storeAutoCompleteInput") {
        getStores({ keyword: value });
      } else if (name === "designSKUAutoCompleteInput") {
        getDesigns({ keyword: value });
      } else if (name === "productSelectBox") {
        getProducts({ keyword: value });
      }
    }, 200);
  }

  const handleInputSelect = (value, option, name) => {
    if (name === "storeAutoCompleteInput") {
      setStoreId(option ? option.value : '');
    } else if (name === "designSKUAutoCompleteInput") {
      setDesignId(option ? option.value : '');
      if (option) {
        form.setFieldsValue({
          mockupUrl: option.convertedDesignUrl,
          designUrl: option.convertedMockupUrl,
        })
      }
    } else if (name === "productSelectBox") {
      setSelectedProduct(option);
    }
  }

  const onProductOptionsChange = (selectedProductOptions) => {
    let calcPrice = selectedProduct.price;
    let calSku = selectedProduct.id;
    for (const [, value] of Object.entries(selectedProductOptions)) {
      calcPrice += value.priceAdjustment;
      calSku += '|' + value.slug;
    }
    setSelectedProduct({
      ...selectedProduct,
      convertedPrice: format.formatCurrency(calcPrice),
      sku: calSku,
    })
  }

  const downloadDesign = (selectedDesign) => {
    SellerDesignsService.downloadDesign(selectedDesign.id, response => {
      notification.success({
        message: "Download design successful!",
      });
      response && download(response.url);
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Download design failure!"),
      });
    });
  }

  const handleCreateNewDesign = () => {
    setOpenAddDesign(true);
  }

  return (
    <BoxCard className={'add-edit-order-box__wrapper'}>
      <>
        <OrderForm
          isEdit={isEdit}
          form={form}
          initialValues={data}
          selectedProduct={selectedProduct}
          productInputValue={productInputValue}
          onProductOptionsChange={onProductOptionsChange}
          productsOptions={productsOptions}
          storesInputValue={storesInputValue}
          storesOptions={storesOptions}
          designsInputValue={designsInputValue}
          designsOptions={designsOptions}
          onInputChange={handleInputChange}
          onInputSelect={handleInputSelect}
          redirectTo={redirectTo}
          onFinish={handleOk}
          onCancel={onCancel}
          onCreateNewDesign={handleCreateNewDesign}
        />
        {
          openAddDesign && (
            <AddEditDesignModal
              open={openAddDesign}
              data={null}
              onOk={getDesigns}
              onCancel={() => { setOpenAddDesign(false); }}
              downloadDesign={downloadDesign}
            />
          )
        }
      </>
    </BoxCard>
  )
}
