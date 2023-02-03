import React from 'react';
import { Button, Col, Form, notification, Row } from 'antd';
import InputText from 'components/Common/InputText';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import { BaseService, FrontUserEmailsService } from 'services';

import "./style.scss";

export default function SignUpBannerBox(props) {
  const handleSubscribe = (values) => {
    FrontUserEmailsService.subscribeEmail(values, response => {
      notification.success({
        message: "Subscribe email successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Subscribe email failure!"),
      });
    })
  }

  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <Row className={`signup-banner__wrapper ${isMobile && 'signup-banner__wrapper--mobile'}`}>
      <Col span={isMobile ? 24 : 12} className="signup-banner__contents">
        <div className='signup-banner__title'>Sign up for Newsletter</div>
        <div className='signup-banner__description'>Sign up and start using a free account to see what it's all about.</div>
        <div className={`signup-banner__actions ${isMobile && 'signup-banner__actions--mobile'}`}>
          <Form
            name="basic"
            onFinish={handleSubscribe}
            className='signup-banner__form'
            autoComplete="off"
            layout={ isMobile ? 'vertical' : 'inline'}
          >
            <Form.Item
              name="email"
              style={{ marginBottom: isMobile ? 8 : 16, height: isMobile ? 'auto' : 62}}
              rules={[
                {
                  type: 'email',
                  message: 'Email is invalid!',
                },
                {
                  required: true,
                  message: 'Please enter email!',
                },
              ]}
            >
              <InputText placeholder={'Your email address'} />
            </Form.Item>
            <Form.Item>
              <Button className="signup-banner__button" htmlType="submit" style={{ width: isMobile ? '100%' : 'auto'}} onClick={handleSubscribe}>Subscribe Now!</Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
