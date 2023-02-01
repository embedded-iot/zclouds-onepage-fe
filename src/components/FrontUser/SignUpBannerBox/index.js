import React from 'react';
import { Button, Col, Row } from 'antd';
import InputText from 'components/Common/InputText';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import "./style.scss";

export default function SignUpBannerBox(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <Row className={`signup-banner__wrapper ${isMobile && 'signup-banner__wrapper--mobile'}`}>
      <Col span={isMobile ? 24 : 12} className="signup-banner__contents">
        <div className='signup-banner__title'>Sign up for Newsletter</div>
        <div className='signup-banner__description'>Sign up and start using a free account to see what it's all about.</div>
        <div className={`signup-banner__actions ${isMobile && 'signup-banner__actions--mobile'}`}>
          <InputText placeholder={'Your email address'} />
          <Button className="signup-banner__button">Subscribe Now!</Button>
        </div>
      </Col>
    </Row>
  );
}
