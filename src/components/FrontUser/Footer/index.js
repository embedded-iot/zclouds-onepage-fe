import React from 'react';
import { Button, Col, Row } from 'antd';
import logo from 'images/logo_icon.svg';
import { SellerSystemService } from 'services';
import { RESPONSIVE_MEDIAS, ROUTERS, SYSTEM_CONFIG_VALUE } from 'components/contants';
import { MessengerChat } from 'react-messenger-chat-plugin';
import { useMediaQuery } from 'react-responsive';
import { DoubleRightOutlined } from '@ant-design/icons';

import './style.scss';

export default function Footer({ systemConfigs = [], redirectTo = () => {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const pageID = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID);
  return (
    <div className={`public-footer__wrapper ${isMobile && 'public-footer__wrapper--mobile'}`}>
      <div className='public-footer__contents'>
        <Row gutter={isMobile ? [0, 24] : [66, 0]}>
          <Col span={isMobile ? 24 : 12}>
            <div className='public-footer__logo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='public-footer__description'>Address: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_ADDRESS)}</div>
            <div className='public-footer__description'>Email: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_EMAIL)}</div>
            <div className='public-footer__description'>Phone: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_PHONE_CALL)}</div>
            <div className='public-footer__contact'>
              <div className='public-footer__detail-contact'>
                <div className='public-footer__detail-contact-label'>Social network:</div>
                <div className='public-footer__social-contact'>
                  <span className="cursor-pointer" onClick={() => window.open(`tel:${SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_PHONE_CALL)}`, '_self')}>
                    {/*<img src={call} alt='call' />*/}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={isMobile ? 24 : 12} className="public-footer__right-block">
            <Row gutter={[42, 42]}>
              <Col span={isMobile ? 24 : 12}>
                <div className='public-footer__title'>Support</div>
                <div className='public-footer__link'>About Us</div>
                <div className='public-footer__link'>Contact Us</div>
                <div className='public-footer__link'>Term of Services</div>
                <div className='public-footer__link'>Return And Refund Policies</div>
              </Col>
              <Col span={isMobile ? 24 : 12}>
                <div className='public-footer__title'>Integration</div>
                <div className='public-footer__link'>Shopbase</div>
                <div className='public-footer__link'>Shopify</div>
                <div className='public-footer__link'>WooCommerce</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='public-footer__social-contact--fixed'>
        <Button type="primary" shape="round" icon={<DoubleRightOutlined />} size={isMobile ? 'middle' : 'large'} onClick={() => redirectTo(ROUTERS.REGISTER)}>Register Now</Button>
        {
          !!pageID && <MessengerChat pageId={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID)} />
        }
      </div>
    </div>
  );
}
