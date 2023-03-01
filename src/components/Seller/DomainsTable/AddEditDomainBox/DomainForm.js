import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import InputText from 'components/Common/InputText';
import { STATE_VALUES } from 'components/contants';

export default function DomainForm({ form, initialValues, onFinish }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: STATE_VALUES.CONNECTED,
        ...initialValues,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[16,16]} style={{ maxWidth: 500}}>
        <Col span={18}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ height: 36}}>
              Connect
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
