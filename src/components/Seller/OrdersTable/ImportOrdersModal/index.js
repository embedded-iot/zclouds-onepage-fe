import React, { useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportOrdersForm from 'components/Seller/OrdersTable/ImportOrdersModal/ImportOrdersForm';
import { BaseService, SellerOrdersService } from 'services';

export default function ImportOrdersModal({ open, onOk, systemConfigs, onCancel }) {
  const [form] = Form.useForm();
  const [orderDataRows, setOrderDataRows] = useState([]);
  const handleOk = (values) => {
    const { file } = values;
    const formData = new FormData();
    if (file.length) {
      formData.set('file', file[0].originFileObj);
    }
    SellerOrdersService.importOrders(formData, response => {
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
    }, error => {
      setOrderDataRows([]);
    })
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
      />
    </ModalView>
  )
}
