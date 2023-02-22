import React, { useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DesignForm from './DesignForm';
import { BaseService, SellerDesignsService } from 'services';
import DesignDetailForm from './DesignDetailForm';
import Icon from 'components/Common/Icon';
import addIcon from 'images/plus-black-icon.svg';
import editIcon from 'images/edit_icon.svg';
import downloadBlackIcon from 'images/download-black.svg';

export default function AddEditDesignModal({ open, data, onOk, onCancel, downloadDesign }) {
  const isEdit = !!data;
  const [isDesignDetail, setIsDesignDetail] = useState(isEdit);
  const [form] = Form.useForm();
  const [selectedDesign, setSelectedDesign] = useState(data);
  const goDesignDetail = (show) => {
    setIsDesignDetail(show)
  }

  const handleOk = (values) => {
    const { slug, type } = values;
    const newData = {
      slug, type
    }
    if (isEdit) {
      goDesignDetail(true);
    } else {
      SellerDesignsService.createDesign(newData, response => {
        notification.success({
          message: "Create design successful!",
        });
        // onOk();
        setSelectedDesign(response);
        goDesignDetail(true);
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create design failure!"),
        });
      })
    }
  }

  const onCancelDesignDetail = () => {
    onOk();
    onCancel();
  }

  const onDownloadDesign = () => {
    downloadDesign(selectedDesign);
  }

  const modalProps = isDesignDetail ? {
    title: `Update design sku: ${selectedDesign.slug}`,
    onCancel: onDownloadDesign,
    cancelText: <span>Download <Icon src={downloadBlackIcon} width={24} height={24} /></span>,
    okText: "Complete",
    onOk: onCancelDesignDetail,
    children: (
      <DesignDetailForm
        designId={selectedDesign.id}
        initialValues={data}
        isEdit={isEdit}
      />
    )
  } : {
    form: form,
    title: isEdit ? "Edit design sku" : "Create design SKU",
    okText: "Continue",
    onOk: handleOk,
    onCancel: onCancel,
    children: (
      <DesignForm
        form={form}
        initialValues={data}
      />
    )
  }

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               {...modalProps}
               title={<><Icon src={isEdit ? editIcon : addIcon} width={isEdit ? 22 : 18} height={isEdit ? 22 : 18} /> {modalProps.title}</>}
    >
      {
        modalProps.children
      }
    </ModalView>
  )
}
