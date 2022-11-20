import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportOrdersForm from 'components/Seller/OrdersTable/ImportOrdersModal/ImportOrdersForm';
import { BaseService, SellerOrdersService } from 'services';

export default function ImportOrdersModal({ open, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    SellerOrdersService.importOrders(values, response => {
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
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Upload multi order"}
               okText={"Upload"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ImportOrdersForm
        form={form}
      />
    </ModalView>
  )
}
