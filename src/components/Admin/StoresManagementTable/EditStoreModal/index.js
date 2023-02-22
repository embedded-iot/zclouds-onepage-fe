import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import StoreForm from './StoreForm';
import { AdminStoresService, BaseService } from 'services';

export default function EditStoreModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    AdminStoresService.updateStoreStatus(data.id, values, response => {
      notification.success({
        message: "Update store successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update store failure!" ),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Edit store"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <StoreForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
