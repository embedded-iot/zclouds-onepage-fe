import React from 'react';
import { Col, Row } from 'antd';
import Icon from 'components/Common/Icon';
import call from 'images/call-black.png';
import facebook from 'images/facebook.png';
import email from 'images/email-icon.png';
import flagGreen from 'images/flag-green-icon.png';
import supportAvatar from 'images/support-avatar.png';

import './style.scss';
import { SellerSystemService } from 'services';
import { SYSTEM_CONFIG_VALUE } from 'components/contants';

export default function Footer({ systemConfigs = [] }) {
  return (
    <div className="seller-footer__wrapper">
      <div className='seller-footer__contents'>
        <Row gutter={[66, 0]}>
          <Col span={12}>
            <div className='seller-footer__title'>Thank you for sticking with CS Fulfill. Follow us now</div>
            <div className='seller-footer__text'>
              <Icon src={facebook} height={12} width={12} />
              <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_FULFILL)} target='_blank' rel="noreferrer">
                Fanpage
              </a>
            </div>
            <div className='seller-footer__text'>
              <Icon src={facebook} height={12} width={12} />
              <a href={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_FULFILL_FULFILLMENT_COMMUNITY)} target='_blank' rel="noreferrer">
                CS FULFILL - Group
              </a>
            </div>
            <div className='seller-footer__title seller-footer__title--margin-top'>Contact us</div>
            <div className='seller-footer__text'>
              <Icon src={email} height={10} width={13} />
              Email: {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_EMAIL_SUPPORT)}
            </div>
            <div className='seller-footer__text'>
              <Icon src={call} height={14} width={14} />
              Hotline:
              <span className="cursor-pointer margin-left-8" onClick={() => window.open(`tel:${SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_HOTLINE)}`, '_self')}>
                {SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_HOTLINE)}
              </span>
            </div>
            <div className='seller-footer__title seller-footer__title--margin-top'>How does Fulfill work</div>
            <div className='seller-footer__link'>Instructions to Use Fulfill Seller v3</div>
            <div className='seller-footer__link'>Term of Services</div>
          </Col>
          <Col span={12}>
            <div className='seller-footer__title'>
              <Icon src={flagGreen} height={12} width={14} />
              Dedicated support team
            </div>
            <Row className='seller-footer__contact-list' gutter={[12,12]}>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_AVATAR_1) || supportAvatar} />
                  <div className='seller-footer__contact-name'>{SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_NAME_1) || 'Le Khanh'}</div>
                  <div className='seller-footer__contact-work'>Support</div>
                </div>
              </Col>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_AVATAR_2) || supportAvatar} />
                  <div className='seller-footer__contact-name'>{SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_NAME_2) || 'Nguyen Hao'}</div>
                  <div className='seller-footer__contact-work'>Support</div>
                </div>
              </Col>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_AVATAR_3) || supportAvatar} />
                  <div className='seller-footer__contact-name'>{SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.SELLER_SUPPORT_NAME_3) || 'Tran Huy'}</div>
                  <div className='seller-footer__contact-work'>Support</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
