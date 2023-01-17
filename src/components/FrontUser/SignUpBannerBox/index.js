import React from 'react';
import { Button, Col, Row } from 'antd';
import InputText from 'components/Common/InputText';

import "./style.scss";

export default function SignUpBannerBox(props) {
  return (
    <Row className='signup-banner__wrapper'>
      <Col span={12} className="signup-banner__contents">
        <div className='signup-banner__title'>Sign up for Newsletter</div>
        <div className='signup-banner__description'>Sign up and start using a free account to see what it's all about.</div>
        <div className='signup-banner__actions'>
          <InputText placeholder={'Your email address'} />
          <Button className="signup-banner__button">Subscribe Now!</Button>
        </div>
      </Col>
    </Row>
  );
}
