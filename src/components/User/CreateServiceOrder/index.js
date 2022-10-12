import React from 'react';
import { Col, notification, Row } from 'antd';
import CreateViewYoutube from './CreateViewYoutube';
import { OrderUserService } from 'services';
import { format } from 'utils';

export default function CreateServiceOrder({ productType, serviceId, products }) {
  const selectedProduct = products.find(product => product.type === productType) || {};
  const selectedService = (selectedProduct.services || []).find(service => service.id.toString() === serviceId) || {}
  const offersOptions = (selectedService.offers || []).map(offer => ({
    value: offer.id,
    label: `${offer.name} (${format.formatCurrency(offer.credit)})`,
    credit: offer.credit,
  }));
  const onFinish = (values) => {
    OrderUserService.createOrder(values, response => {
      notification.success({
        message: "Bạn đã tạo đơn hàng thành công!",
      });
    }, error => {
      notification.error({
        message: error.title || "Không thể tạo đơn hàng bây giờ. Vui lòng thử lại sau!",
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
