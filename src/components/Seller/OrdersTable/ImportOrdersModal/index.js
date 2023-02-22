import React, { useEffect, useRef, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportOrdersForm from 'components/Seller/OrdersTable/ImportOrdersModal/ImportOrdersForm';
import { BaseService, SellerOrdersService, SellerStoresService } from 'services';
import { getStoresOptions } from 'services/Seller/StoresService';

export default function ImportOrdersModal({ open, onOk, systemConfigs, onCancel }) {
  const [form] = Form.useForm();
  let ref = useRef({});
  const [orderDataRows, setOrderDataRows] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [storesInputValue, setStoreInputValue] = useState('');
  const [storesOptions, setStoresOptions] = useState([]);
  const handleOk = (values) => {
    const data = {
      storeId,
      rowOrders: orderDataRows
    }
    SellerOrdersService.importOrders(data, response => {
      notification.success({
        message: "Import orders successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Import orders failure!"),
      });
    })
  }

  const handleFileChange = file => {
    if (!file) {
      setOrderDataRows([]);
      return;
    }
    const formData = new FormData();
    formData.set('file', file.originFileObj);
    SellerOrdersService.validateOrdersData(formData, response => {
      setOrderDataRows(response || []);
      form.validateFields(['file']);
    }, error => {
      setOrderDataRows([]);
    })
  }

  const getStores = (params = {}) => {
    SellerStoresService.getStores({ pageNum: 1, pageSize: 100, ...params }, response => {
      setStoresOptions(getStoresOptions(response.items, false));
    }, () => {}, true)
  }


  useEffect(() => {
    getStores();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (value, name) => {
    setStoreInputValue(value);
    setStoreId('');
    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getStores({ keyword: value });
    }, 200);
  }

  const handleInputSelect = (value, option, name) => {
    setStoreId(option ? option.value : '');
  }

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Import orders"}
               okText={"Import"}
               width={1000}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ImportOrdersForm
        form={form}
        systemConfigs={systemConfigs}
        onFileChange={handleFileChange}
        orderDataRows={orderDataRows}
        storesInputValue={storesInputValue}
        storesOptions={storesOptions}
        onInputChange={handleInputChange}
        onInputSelect={handleInputSelect}
      />
    </ModalView>
  )
}
