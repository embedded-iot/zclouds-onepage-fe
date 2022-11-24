import React, { useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DesignForm from './DesignForm';
import { BaseService, SellerDesignsService } from 'services';
import DesignDetailForm from './DesignDetailForm';

export default function AddEditDesignModal({ open, data, onOk, onCancel }) {
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

  const modalProps = isDesignDetail ? {
    title: `Update design sku: ${selectedDesign.slug}`,
    onCancel: onCancelDesignDetail,
    footer: null,
    children: (
      <DesignDetailForm
        designId={selectedDesign.id}
        initialValues={data}
      />
    )
  } : {
    form: form,
    title: isEdit ? "Edit design sku" : "Create design sku",
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
    >
      {
        modalProps.children
      }
    </ModalView>
  )
}
