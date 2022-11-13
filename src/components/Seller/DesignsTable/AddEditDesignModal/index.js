import React, { useRef, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DesignForm from './DesignForm';
import { SellerDesignsService } from 'services';
import DesignDetailForm from './DesignDetailForm';

export default function AddEditDesignModal({ open, data, onOk, onCancel }) {
  const [isDesignDetail, setIsDesignDetail] = useState(true);
  const [form] = Form.useForm();
  const isEdit = !!data;
  let ref = useRef({});
  const goDesignDetail = (show) => {
    setIsDesignDetail(show)
  }

  const handleOk = (values) => {
    const { slug, type } = values;
    const newData = {
      slug, type
    }
    if (isEdit) {
      SellerDesignsService.updateDesign(data.id, newData, response => {
        notification.success({
          message: "Update design successful!",
        });
        goDesignDetail(true);
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update design failure!",
        });
      })
    } else {
      SellerDesignsService.createDesign(newData, response => {
        ref.current.designId = response.id;
        notification.success({
          message: "Create design successful!",
        });
        goDesignDetail(true);
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create design failure!",
        });
      })
    }

  }
  return !isDesignDetail ? (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit design" : "Add design"}
               okText={"Continue"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <DesignForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  ) : (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Add design detail"}
               cancelText={"Back"}
               okText={"Close"}
               onCancel={() => goDesignDetail(false)}
               onOk={onCancel}
    >
      <DesignDetailForm
        designId={ref.current && ref.current.designId ? ref.current.designId : !!data && data.id}
        initialValues={data}
      />
    </ModalView>
  )
}
