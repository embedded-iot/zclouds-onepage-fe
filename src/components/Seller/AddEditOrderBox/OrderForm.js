import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import InputNumber from 'components/Common/InputNumber';
import InputText from 'components/Common/InputText';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import ProductSelectBox from 'components/Seller/AddEditOrderBox/ProductSelectBox';
import { LinkOutlined } from '@ant-design/icons';

import './style.scss';

export default function OrderForm(
    {
      isEdit, form, onFinish, onCancel, initialValues,
      selectedProduct, productInputValue, productsOptions, onProductOptionsChange,
      designsInputValue, designsOptions,
      storesInputValue, storesOptions,
      onInputChange, onInputSelect,
      redirectTo, onCreateNewDesign, ...restProps
    }
  ) {
  const handleValuesChange = values => {
    console.log(values);
  };

  const handleProductLinkClick = () => {
    window.open(initialValues.productLink, '_blank')
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
        storeInput: storesInputValue,
        designSKUInput: designsInputValue,
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
            name="productSelectBox"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (selectedProduct && selectedProduct.id) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please select a product!'));
                },
              }),
            ]}
          >
            <ProductSelectBox
              name="productSelectBox"
              options={productsOptions}
              value={productInputValue}
              onChange={onInputChange}
              onSelect={onInputSelect}
              selectedProduct={selectedProduct}
              onProductOptionsChange={onProductOptionsChange}
              hasLabel={true}
            />
          </Form.Item>
          <div className='add-edit-order-box__description'>
            With the products have Clone design option, please choose “yes” if you want Fulfill help to clone design or choose “no” if you do it by yourself.
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
                <InputText placeholder="..."  />
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
                <InputText placeholder="..."  />
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
                    type: 'url',
                    message: 'Url invalid!',
                  },
                ]}
              >
                <InputText placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Design SKU"
                name="designSKUInput"
                tooltip={{
                  title: 'Design SKU',
                  icon: <InfoCircleOutlined />,
                }}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please select design!',
                //   },
                //   ({ getFieldValue }) => ({
                //     validator(_, value) {
                //       const existingStore = designsOptions.find(item => item.label === value || item.value === value);
                //       if (!value || existingStore) {
                //         return Promise.resolve();
                //       }
                //       return Promise.reject(new Error('Design is not existing!'));
                //     },
                //   }),
                // ]}
              >
                <AutoCompleteInput name="designSKUAutoCompleteInput"
                                   value={designsInputValue}
                                   onChange={onInputChange}
                                   onSelect={onInputSelect}
                                   placeholder={"All design SKU"}
                                   options={designsOptions}
                                   autoFilterOptions={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"  "}
              >
                <Button type="primary" ghost className="add-edit-order-box__create-design" onClick={onCreateNewDesign}>Create</Button>
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
                name="storeInput"
                rules={[
                  {
                    required: true,
                    message: 'Please select store!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const existingStore = storesOptions.find(item => item.label === value || item.value === value);
                      if (!value || existingStore) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Store is not existing!'));
                    },
                  }),
                ]}
              >
                <AutoCompleteInput name="storeAutoCompleteInput"
                                   value={storesInputValue}
                                   onChange={onInputChange}
                                   onSelect={onInputSelect}
                                   placeholder={"All Stores"}
                                   options={storesOptions}
                                   autoFilterOptions={false}
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
                <InputText placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Order Note"
            name="orderNote"
          >
            <InputText placeholder="..."  />
          </Form.Item>
          {
            !!initialValues && !!initialValues.productLink && (
              <div className="display-flex display-flex--center-align-items">
                <Form.Item
                  label="Your product"
                  name="productLink"
                  style={{ width: '100%' }}
                >
                  <InputText disabled={true} placeholder="..."  />
                </Form.Item>
                <Button icon={<LinkOutlined />} style={{ margin: '8px 0 0 8px'}} onClick={handleProductLinkClick}/>
              </div>
            )
          }
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
                <InputText placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number (Optional)"
                name="phoneNumber"
              >
                <InputText placeholder="..."  />
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
            <InputText placeholder="..."  />
          </Form.Item>
          <Form.Item
            label="Address 2 (Optional)"
            name="address2"
          >
            <InputText placeholder="..."  />
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
                <InputText placeholder="..."  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ZIP code (Postal code)"
                name="zipCode"
              >
                <InputText placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="State/Region (Optional)"
                name="region"
              >
                <InputText placeholder="..."  />
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
                <InputText placeholder="..."  />
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
