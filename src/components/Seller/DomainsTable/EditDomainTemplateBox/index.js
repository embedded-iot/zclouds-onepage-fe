import React from 'react';
import { Form, notification } from 'antd';
import DomainTemplateForm from './DomainTemplateForm';
import { SellerDomainsService, BaseService } from 'services';

import './style.scss';

export default function EditDomainTemplateBox({ data, onOk, goBack }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    SellerDomainsService.editDomainTemplate(data, values, response => {
      notification.success({
        message: "Edit domain template successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Edit domain template failure!"),
      });
    })
  }
  return (
    <DomainTemplateForm
      form={form}
      initialValues={data}
      onFinish={handleOk}
      onCancel={goBack}
    />
  )
}
