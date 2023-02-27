import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DomainForm from './DomainForm';
import { SellerDomainsService, BaseService } from 'services';

export default function AddEditDomainModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      SellerDomainsService.updateDomain(data.id, values, response => {
        notification.success({
          message: "Update Domain successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update Domain failure!" ),
        });
      })
    } else {
      SellerDomainsService.createDomain(values, response => {
        notification.success({
          message: "Create Domain successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create Domain failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit Domain" : "Add Domain"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <DomainForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
