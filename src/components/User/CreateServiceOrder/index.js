import React from 'react';
import { Col, notification, Row } from 'antd';
import CreateViewYoutube from './CreateViewYoutube';
import { OrderUserService } from 'services';

export default function CreateServiceOrder({ productType, serviceId, products }) {
  const selectedProduct = products.find(product => product.type === productType) || {};
  const selectedService = (selectedProduct.services || []).find(service => service.id.toString() === serviceId) || {}
  const offersOptions = (selectedService.offers || []).map(offer => ({
    value: offer.id,
    label: `${offer.name} (${offer.credit} đ)`,
    credit: offer.credit,
  }));
  const onFinish = (values) => {
    OrderUserService.createOrder(values, response => {
      notification.success({
        message: "Bạn đã tạo đơn hàng thành công!",
      });
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể tạo đơn hàng bây giờ. Vui lòng thử lại sau!",
      });
    })
  }

  return (
    <Row>
      <Col span={12}>
        <CreateViewYoutube onFinish={onFinish} offersOptions={offersOptions} />
      </Col>
    </Row>
  );
}
