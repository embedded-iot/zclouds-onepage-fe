import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form } from 'antd';
import CreateNewStoreForm from './CreateNewStoreForm';
import Icon from 'components/Common/Icon';
import storeIcon from 'images/stores-icon.png'

export default function CreateNewStoreModal({ open, onOk, onCancel }) {
  const [form] = Form.useForm();
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={<><Icon src={storeIcon} width={24} height={24} /> New Store</>}
               okText={"Continue"}
               onOk={onOk}
               onCancel={onCancel}
               hideCancelBtn={true}
               maskClosable={true}
    >
      <CreateNewStoreForm form={form} />
    </ModalView>
  )
}
