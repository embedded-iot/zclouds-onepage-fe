import React, { useState } from 'react';
import { Alert, Button, Card, Form, Input, InputNumber, Select } from 'antd';

export default function CreateViewYoutube({ onFinish = () => {}, offersOptions = [], redirectTo = () => {} }) {
  const [totalCredit, setTotalCredit] = useState(0)
  const message = (
    <span>
      Bạn sử dụng dịch vụ nhớ đọc Thông tin gói và mục Lưu ý gói bên phải <br/>
        Điền đúng link, không điền link dạng share http://yotu.be... <br/>
        Video và Kênh không được hạn chế, phải mở cho tất cả các quốc gia <br/>
        *Lưu ý: Số view đã tăng trong phần lịch sử có thể không cập nhật khi đơn đang chạy, bạn hãy xem số view thực tế ở Video
    </span>
  );
  const handlerValuesChange = (values, allValues) => {
    const selectedOffer = !!allValues.offerId ? offersOptions.find(option => option.value === allValues.offerId) : {}
    setTotalCredit((allValues.quantity || 0) * (selectedOffer.credit || 0));
  }

  return (
    <Card>
      <Alert message={message} type="info" style={{marginBottom: 20}}/>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onValuesChange={handlerValuesChange}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Link Youtube"
          name="targetLink"
          rules={[
            {
              required: true,
              message: 'Link Video không được để trống!',
            },
            {
              type: 'url',
              message: 'Link Video không hợp lệ!',
            },
          ]}
        >
          <Input placeholder="Link Video Youtube" />
        </Form.Item>

        <Form.Item
          label="Chọn gói"
          name="offerId"
          rules={[
            {
              required: true,
              message: 'Chọn gói không được để trống!',
            },
          ]}
        >
          <Select placeholder="Chọn gói phù hợp" options={offersOptions}></Select>
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            {
              required: true,
              message: 'Số lượng không được để trống!',
            },
          ]}
        >
          <InputNumber min={0} placeholder="Số lượng" />
        </Form.Item>
        <p>Thanh toán: {totalCredit} đ</p>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit">
           ORDER NGAY
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
