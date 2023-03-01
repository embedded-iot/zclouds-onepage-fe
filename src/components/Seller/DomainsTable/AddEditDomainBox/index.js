import React from 'react';
import { Form, notification } from 'antd';
import DomainForm from './DomainForm';
import { SellerDomainsService, BaseService } from 'services';

export default function AddEditDomainBox({ data, onOk }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    SellerDomainsService.createDomain(values, response => {
      notification.success({
        message: "Connect domain successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Connect domain failure!"),
      });
    })
  }
  return (
    <>
      <DomainForm
        form={form}
        initialValues={data}
        onFinish={handleOk}
      />
      <div>
        eYour A record should point to Cella's IP address, which is 52.45.63.199<br/>
        Your www CNAME record should point to shops.onwhatee.com
      </div>
    </>
  )
}
