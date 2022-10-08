import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import { ORDER_STATUS } from 'components/contants';
import InputText from 'components/Common/InputText';

export default function OrdersHistoryFilters({ products = [], onChange = () => {} }) {
  const [filters, setFilters] = useState({});

  let servicesOptions = [];
  products.forEach(product => {
    servicesOptions = [
      ...servicesOptions,
      ...(product.services.map(service => ({ value: service.name }))),
    ]
  })
  const statusOptions = ORDER_STATUS;

  const onChangeInput = (value, name) => {
    console.log(value);
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  }

  const handlerSearch = () => {
    console.log(filters);
  }

  const handlerClear = () => {
    setFilters({});
  }

  return (
    <Row gutter={10}>
      <Col span={4}>
        <InputText placeholder="Tìm theo mã đơn hàng"
                   value={filters.orderId}
                   name="orderId"
                   onChange={onChangeInput}
        />
      </Col>
      <Col span={4}>
        <InputText placeholder="Tìm theo Post ID"
                   value={filters.postId}
                   name="postId"
                   onChange={onChangeInput}
        />
      </Col>
      <Col span={4}>
        <AutoCompleteInput options={servicesOptions}
                           value={filters.serviceId}
                           placeholder="Tìm theo dịch vụ"
                           name="serviceId"
                           onChange={onChangeInput}
        />
      </Col>
      <Col span={4}>
        <AutoCompleteInput options={statusOptions}
                           value={filters.status}
                           placeholder="Tìm theo trạng thái"
                           name="status"
                           onChange={onChangeInput}
        />
      </Col>
      <Col span={4}>
        <Button type="primary" onClick={handlerSearch} style={{marginRight: '10px'}}>Tìm kiếm</Button>
        <Button onClick={handlerClear}>Xóa lọc</Button>
      </Col>
    </Row>
  );
}
