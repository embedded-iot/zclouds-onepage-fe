import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import SellerForm from './SellerForm';
import { AdminResellersService, BaseService } from 'services';

export default function EditSellerModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    AdminResellersService.updateSellerStatus(data.id, values, response => {
      notification.success({
        message: "Update seller successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update seller failure!" ),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Edit seller"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <SellerForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
