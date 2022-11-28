import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ImportDesignsForm from 'components/Seller/DesignsTable/ImportDesignsModal/ImportDesignsForm';
import { BaseService, SellerDesignsService } from 'services';
import imgBlack from 'images/img-black-icon.svg';
import Icon from 'components/Common/Icon';

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
        message: BaseService.getErrorMessage(error,"Import designs failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={<><Icon src={imgBlack} width={20} height={20}/> Upload multi design </>}
               okText={"Import"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ImportDesignsForm
        form={form}
      />
    </ModalView>
  )
}
