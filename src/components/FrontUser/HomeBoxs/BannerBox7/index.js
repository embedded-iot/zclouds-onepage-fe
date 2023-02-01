import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FAQsBox from 'components/FrontUser/FAQsBox';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';

export default function BannerBox7({ customClass, successCallback }) {
  const [FAQsCount, setFAQsCount] = useState(0);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const handleSuccessCallback = ({ activatedFAQs = [] }) => {
    setFAQsCount(activatedFAQs.length);
  }
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-7__wrapper ${isMobile && 'padding-box--mobile'} ${FAQsCount ? 'show' : ''}`}>
      <Row>
        <Col span={24} className="banner-box-7__center-box">
          <div className='banner-box-7__contents'>
            <div className='home-box__title'>
              <span className="link link--text banner-box-7__link">FAQs</span>
            </div>
            <div className='banner-box-7__fqa-list'>
              <FAQsBox successCallback={handleSuccessCallback} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
