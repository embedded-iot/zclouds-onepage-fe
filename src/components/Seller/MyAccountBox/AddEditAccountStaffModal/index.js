import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import AccountStaffForm from './AccountStaffForm';
import Icon from 'components/Common/Icon';
import userIcon from 'images/user_black_icon.svg'
import { AdminUsersService, BaseService, SellerUsersService } from 'services';

export default function AddEditAccountStaffModal({ open, data, onOk, onCancel }) {
  const isEdit = !!data;
  const [form] = Form.useForm();
  const handleOk = (values) => {
    if (isEdit) {
      SellerUsersService.updateAccountStaff(data.id, values, response => {
        notification.success({
          message: "Update account staff successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Update account staff failure!"),
        });
      })
    } else {
      AdminUsersService.createUser(values, response => {
        notification.success({
          message: "Create account staff successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create account staff failure!"),
        });
      })
    }
  }

  return (
  <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
             form={form}
             open={open}
             title={<><Icon src={userIcon} width={24} height={24} /><span>{isEdit ? "Update account staff" : "Add account staff"}</span></>}
             okText={"Save"}
             onOk={handleOk}
             onCancel={onCancel}
  >
    <AccountStaffForm form={form}
                      initialValues={data}
                      isEdit={isEdit}
    />
  </ModalView>
  )
}
