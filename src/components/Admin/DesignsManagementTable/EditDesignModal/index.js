import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DesignForm from './DesignForm';
import { AdminDesignsService, BaseService } from 'services';

export default function EditDesignModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    AdminDesignsService.updateDesignStatus(data.id, values, response => {
      notification.success({
        message: "Update design successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update design failure!" ),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Edit design"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <DesignForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
