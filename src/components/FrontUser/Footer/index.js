import React from 'react';
import { Col, Row } from 'antd';
import logo from 'images/logo-white.svg';
import call from 'images/call.png';
import zalo from 'images/zalo.png';
import facebook from 'images/facebook.png';
import { SellerSystemService } from 'services';
import { SYSTEM_CONFIG_VALUE } from 'components/contants';
import { MessengerChat } from 'react-messenger-chat-plugin';
import './style.scss';

export default function Footer({ systemConfigs = []}) {
  const pageID = SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID);
  return (
    <div className="public-footer__wrapper">
      <div className='public-footer__contents'>
        <Row gutter={[66, 0]}>
          <Col span={12}>
            <div className='public-footer__logo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='public-footer__description'>Address: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_ADDRESS)}</div>
            <div className='public-footer__description'>Email: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_EMAIL)}</div>
            <div className='public-footer__description'>Phone: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_ADDRESS)}</div>
            <div className='public-footer__contact'>
              <div className='public-footer__detail-contact'>
                <div className='public-footer__detail-contact-label'>Social network:</div>
                <div className='public-footer__social-contact'>
                  <span className="cursor-pointer" onClick={() => window.open(`tel:${SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_PHONE_CALL)}`, '_self')}>
                    <img src={call} alt='call' />
                  </span>
                  <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_CALL)} target='_blank' rel="noreferrer">
                    <img src={zalo} alt='zalo' />
                  </a>
                  <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK)} target='_blank' rel="noreferrer">
                    <img src={facebook} alt='facebook' />
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12} className="public-footer__right-block">
            <Row gutter={[42, 0]}>
              <Col span={12}>
                <div className='public-footer__title'>Support</div>
                <div className='public-footer__link'>About Us</div>
                <div className='public-footer__link'>Contact Us</div>
                <div className='public-footer__link'>Term of Services</div>
                <div className='public-footer__link'>Return And Refund Policies</div>
              </Col>
              <Col span={12}>
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
        <span className="cursor-pointer" onClick={() => window.open(`tel:${SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_PHONE_CALL)}`, '_self')}>
          <img src={call} alt='call' style={{width: 50}}/>
        </span>
        <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_CALL)} target='_blank' rel="noreferrer">
          <img src={zalo} alt='zalo' style={{width: 75}}/>
        </a>
        <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK)} target='_blank' rel="noreferrer">
          <img src={facebook} alt='facebook' style={{width: 60}}/>
        </a>
        {
          !!pageID && <MessengerChat pageId={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.HOME_FACEBOOK_PAGE_ID)} />
        }
      </div>
    </div>
  );
}
