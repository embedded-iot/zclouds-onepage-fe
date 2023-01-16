import React, { useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportDesignsForm from 'components/Seller/DesignsTable/ImportDesignsModal/ImportDesignsForm';
import { BaseService, SellerDesignsService } from 'services';
import imgBlack from 'images/img-black-icon.svg';
import Icon from 'components/Common/Icon';
import GuideTemplate from './GuideTemplate';

export default function ImportDesignsModal({ open, onOk, onCancel }) {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const handleOk = (values) => {
    const { type, file } = values;
    const formData = new FormData();
    file.forEach((file) => {
      formData.append('files[]', file.originFileObj);
    });
    SellerDesignsService.importDesigns(type, formData, response => {
      notification.success({
        message: "Import designs successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Import designs failure!"),
      });
    })
  }

  const modalProps = step ? {
    okText: "Import",
    onOk: handleOk,
    cancelText: "Back",
    onCancel: () => setStep(step - 1),
    body: (
      <ImportDesignsForm
        form={form}
      />
    )
  } : {
    okText: "Next",
    onOk: () => setStep(step + 1),
    cancelText: "Cancel",
    onCancel: onCancel,
    body: <GuideTemplate />
  };

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={<><Icon src={imgBlack} width={20} height={20}/> Upload multi design </>}
               cancelText={modalProps.cancelText}
               okText={modalProps.okText}
               onOk={modalProps.onOk}
               onCancel={modalProps.onCancel}
    >
      {
        modalProps.body
      }
    </ModalView>
  )
}
