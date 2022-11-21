import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputNumber from 'components/Common/InputNumber';
import { ROUTERS } from 'components/contants';
import './style.scss';

export default function OrderForm({ form, onFinish, onCancel, initialValues, productsOptions, designsOptions, storesOptions, redirectTo, ...restProps }) {
  const handleValuesChange = values => {
    // console.log(values);
  };
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        storeId: '',
        designId: '',
        productId: '',
        ...initialValues,
      }}
      onValuesChange={handleValuesChange}
      onFinish={onFinish}
      layout="vertical"
      {...restProps}
    >
      <Row gutter={[42, 0]}>
        <Col span={12}>
          <div className='add-edit-order-box__title'>1. Choose product</div>
          <Form.Item
            label="Product"
            name="productId"
            rules={[
              {
                required: true,
                message: 'Please select product!',
              },
            ]}
          >
            <DropdownSelect
              options={productsOptions}
            />
          </Form.Item>
          <div className='add-edit-order-box__description'>
            With the products have Clone design option, please choose “yes” if you want Lenful help to clone design or choose “no” if you do it by yourself.
          </div>
          <div className='add-edit-order-box__sub-title'>Info variant:</div>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Your Product Name"
                name="productName"
                tooltip={{
                  title: 'Your Product Name',
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter product name!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Item Number (Qty)"
                name="quantity"
                tooltip={{
                  title: 'Item Number (Qty)',
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter item number!',
                  },
                ]}
              >
                <InputNumber min={0} placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Mockup URL"
                name="mockupUrl"
                tooltip={{
                  title: 'Mockup URL',
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter mockup url!',
                  },
                  {
                    type: 'url',
                    message: 'Url invalid!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Design URL"
                name="designUrl"
                tooltip={{
                  title: 'Design URL',
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter design url!',
                  },
                  {
                    type: 'url',
                    message: 'Url invalid!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Design SKU"
                name="designId"
                tooltip={{
                  title: 'Design SKU',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <DropdownSelect
                  options={designsOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"  "}
              >
                <Button type="primary" ghost onClick={() => redirectTo(ROUTERS.SELLER_DESIGN_LIBRARY)}>Create</Button>
              </Form.Item>
            </Col>
          </Row>

        </Col>
        <Col span={12}>
          <div className='add-edit-order-box__title'>2. Order Info</div>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Store"
                name="storeId"
                rules={[
                  {
                    required: true,
                    message: 'Please select store!',
                  },
                ]}
              >
                <DropdownSelect
                  options={storesOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Your order number"
                name="orderNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please enter order number!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Order Note"
            name="orderNote"
            rules={[
              {
                required: true,
                message: 'Please enter order note!',
              },
            ]}
          >
            <Input placeholder="..."  />
          </Form.Item>
          <div className='add-edit-order-box__divider' />
          <div className='add-edit-order-box__title'>3. Shipping Info</div>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter full name!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number (Optional)"
                name="phoneNumber"
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Address 1"
            name="address1"
            rules={[
              {
                required: true,
                message: 'Please enter address 1!',
              },
            ]}
          >
            <Input placeholder="..."  />
          </Form.Item>
          <Form.Item
            label="Address 2 (Optional)"
            name="address2"
          >
            <Input placeholder="..."  />
          </Form.Item>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: 'Please enter country!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ZIP code (Postal code)"
                name="zipCode"
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="State/Region (Optional)"
                name="region"
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please enter city!',
                  },
                ]}
              >
                <Input placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <div className='add-edit-order-box__note'>
            If the address is wrong, it will take a long time to check the order address in processing, leading to delayed shipping, please double check the order address carefully.
          </div>
        </Col>
      </Row>
      <div className='add-edit-order-box__button-list'>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  )
}
