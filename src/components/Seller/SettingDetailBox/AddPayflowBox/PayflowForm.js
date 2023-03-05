import React from 'react';
import { Button, Col, Divider, Form, Row } from 'antd';
import InputPassword from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';
import InputText from 'components/Common/InputText';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import AcceptedPaymentsBox from 'components/Seller/SettingDetailBox/Share/AcceptedPaymentsBox';

export default function PayflowForm({ onFinish = () => {},  onCancel = () => {}, }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  const buttonList = [
    <Button onClick={onCancel}>
      Discard
    </Button>,
    <Button type="primary" htmlType="submit">
      Add
    </Button>
  ];
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      onValuesChange={(values) => console.log(values)}
      initialValues={{
        acceptedPayments: []
      }}
    >
      <BoxWrapper className={`${!isMobile && 'card-box__wrapper'}`}>
        <Row>
          <Col span={11}>
            <Form.Item>
              <BoxHeader
                title="PAYPAL FLOW PRO"
                align="left"
              />
            </Form.Item>
            <Form.Item
              label="Name / Email"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter payment name/email!',
                },
              ]}
            >
              <InputText placeholder="Name / Email" />
            </Form.Item>
            <Form.Item
              label="Merchant Login / Vendor"
              name="merchantLoginVendor"
            >
              <InputText placeholder="Merchant Login / Vendor"  />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
            >
              <InputPassword placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Partner"
              name="partner"
            >
              <InputText placeholder="Partner"  />
            </Form.Item>
            <Form.Item
              label="User"
              name="user"
              className="no-margin"
            >
              <InputText placeholder="User"  />
            </Form.Item>
            <Form.Item>
              <span className='general-setting-box__note'>Using to Paypal Express & Refund Features</span>
            </Form.Item>
            <Form.Item
              label="Client ID"
              name="clientId"
              rules={[
                {
                  required: true,
                  message: 'Please enter client ID!',
                },
              ]}
            >
              <InputText placeholder="Client ID"  />
            </Form.Item>
            <Form.Item
              label="Secret Key"
              name="secret"
              rules={[
                {
                  required: true,
                  message: 'Please enter secret!',
                },
              ]}
            >
              <InputPassword placeholder="Secret Key" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Divider type='vertical' className="general-setting-box__divider--vertical"/>
          </Col>
          <Col span={11}>
            <Form.Item>
              <BoxHeader
                title="ACCEPTED PAYMENTS"
                align="left"
              />
            </Form.Item>
            <Form.Item
              name="acceptedPayments"
            >
              <AcceptedPaymentsBox />
            </Form.Item>
          </Col>
        </Row>
      </BoxWrapper>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  );
}
