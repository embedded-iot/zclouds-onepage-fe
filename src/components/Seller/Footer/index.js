import React from 'react';
import { Col, Row } from 'antd';
import Icon from 'components/Common/Icon';
import call from 'images/call-black.png';
import facebook from 'images/facebook.png';
import email from 'images/email-icon.png';
import flagGreen from 'images/flag-green-icon.png';
import supportAvatar from 'images/support-avatar.png';

import './style.scss';

export default function Footer() {
  return (
    <div className="seller-footer__wrapper">
      <div className='seller-footer__contents'>
        <Row gutter={[66, 0]}>
          <Col span={12}>
            <div className='seller-footer__title'>Thank you for sticking with Lenful. Follow us now</div>
            <div className='seller-footer__text'>
              <Icon src={facebook} height={12} width={12} />
              Lenful
            </div>
            <div className='seller-footer__text'>
              <Icon src={facebook} height={12} width={12} />
              Lenful - Fulfillment Community
            </div>
            <div className='seller-footer__title seller-footer__title--margin-top'>Contact us</div>
            <div className='seller-footer__text'>
              <Icon src={email} height={10} width={13} />
              Email: support@lenful.com
            </div>
            <div className='seller-footer__text'>
              <Icon src={call} height={14} width={14} />
              Hotline: +84 888 553 888
            </div>
            <div className='seller-footer__title seller-footer__title--margin-top'>How does Lenful work</div>
            <div className='seller-footer__link'>Instructions to Use Lenful Seller v3</div>
            <div className='seller-footer__link'>Term of Services</div>
          </Col>
          <Col span={12}>
            <div className='seller-footer__title'>
              <Icon src={flagGreen} height={12} width={14} />
              How does Lenful work
            </div>
            <Row className='seller-footer__contact-list' gutter={[12,12]}>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={supportAvatar} />
                  <div className='seller-footer__contact-name'>Hong Nguyen</div>
                  <div className='seller-footer__contact-work'>Support</div>
                </div>
              </Col>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={supportAvatar} />
                  <div className='seller-footer__contact-name'>Hong Nguyen</div>
                  <div className='seller-footer__contact-work'>Support</div>
                </div>
              </Col>
              <Col span={8}>
                <div className='seller-footer__contact-item' >
                  <Icon src={supportAvatar} />
                  <div className='seller-footer__contact-name'>Hong Nguyen</div>
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
