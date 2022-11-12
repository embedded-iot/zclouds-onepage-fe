import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportDesignsForm from 'components/Seller/DesignsTable/ImportDesignsModal/ImportDesignsForm';
import { SellerDesignsService } from 'services';

export default function ImportDesignsModal({ open, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    SellerDesignsService.importDesigns(values, response => {
      notification.success({
        message: "Import designs successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: error && error.title ? error.title : "Import designs failure!",
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Upload multi design"}
               okText={"Upload"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ImportDesignsForm
        form={form}
      />
    </ModalView>
  )
}
