import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import BankForm from './BankForm';
import { AdminBanksService, BaseService } from 'services';

export default function AddEditBankModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    const { displayOrder, name, slug, state, avatarFileList } = values;
    const featureImage = !!avatarFileList.length ? avatarFileList[0].response.url : null;
    const bankData = {
      displayOrder, name, slug, state, featureImage
    }
    if (isEdit) {
      AdminBanksService.updateBank(data.id, bankData, response => {
        notification.success({
          message: "Update bank successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update bank failure!" ),
        });
      })
    } else {
      AdminBanksService.createBank(bankData, response => {
        notification.success({
          message: "Create bank successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create bank failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit bank" : "Add bank"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <BankForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
