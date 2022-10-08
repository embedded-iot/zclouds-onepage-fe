import React from 'react';
import { Alert, Button, Card, Form, Input, Select } from 'antd';

export default function CreateViewYoutube({ onFinish = () => {}, redirectTo = () => {} }) {
  const message = (
    <span>
      Bạn sử dụng dịch vụ nhớ đọc Thông tin gói và mục Lưu ý gói bên phải <br/>
        Điền đúng link, không điền link dạng share http://yotu.be... <br/>
        Video và Kênh không được hạn chế, phải mở cho tất cả các quốc gia <br/>
        *Lưu ý: Số view đã tăng trong phần lịch sử có thể không cập nhật khi đơn đang chạy, bạn hãy xem số view thực tế ở Video
    </span>
  );
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
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Link Youtube"
          name="link"
        >
          <Input placeholder="Link Video Youtube" />
        </Form.Item>

        <Form.Item
          label="Chọn gói"
          name="package"
        >
          <Select>
            <Select.Option value="package1">Hack Views youtube Server 1 - 50đ</Select.Option>
            <Select.Option value="package2">Short Views youtube Server 2 - 50đ</Select.Option>
            <Select.Option value="package3">Tăng giờ xem Youtube 4000h - 150đ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="count"
        >
          <Input placeholder="Số lượng" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit">
           ORDER NGAY
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
