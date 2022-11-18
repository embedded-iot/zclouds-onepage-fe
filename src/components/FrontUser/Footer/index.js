import React from 'react';
import { Col, Row } from 'antd';
import logo from 'images/logo-white.svg';
import avatar from 'images/avatar.png';
import messenger from 'images/messenger.png';
import call from 'images/call.png';
import zalo from 'images/zalo.png';
import facebook from 'images/facebook.png';

import './style.scss';

export default function Footer() {
  return (
    <div className="public-footer__wrapper">
      <div className='public-footer__contents'>
        <Row gutter={[66, 0]}>
          <Col span={12}>
            <div className='public-footer__logo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='public-footer__description'>Grow your business with Lenful today.</div>
            <div className='public-footer__contact'>
              <div className='public-footer__avatar'>
                <img src={avatar} alt='avatar' />
              </div>
              <div className='public-footer__detail-contact'>
                <div className='public-footer__detail-contact-label'>Liên hệ với chúng tôi qua</div>
                <div className='public-footer__social-contact'>
                  <img src={messenger} alt='messenger' />
                  <img src={call} alt='call' />
                  <img src={zalo} alt='zalo' />
                  <img src={facebook} alt='facebook' />
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Row gutter={[42, 0]}>
              <Col span={12}>
                <div className='public-footer__title'>Support</div>
                <div className='public-footer__link'>Import Order By Csv / Exel Files</div>
                <div className='public-footer__link'>Instructions to Use Lenful Seller v3</div>
                <div className='public-footer__link'>Connect with shopify store Fulfillment</div>
                <div className='public-footer__link'>Term of Services</div>
                <div className='public-footer__link'>Return and Refund</div>
                <div className='public-footer__link'>Upload orders from CSV or Excel file</div>
              </Col>
              <Col span={12}>
                <div className='public-footer__title'>About Us</div>
                <div className='public-footer__link'>Price List</div>
                <div className='public-footer__link'>VietNam Product Price List</div>
                <div className='public-footer__link'>Privacy Policy</div>
                <div className='public-footer__title public-footer__title--margin-top'>Contact</div>
                <div className='public-footer__link'>Email: support@lenful.com</div>
                <div className='public-footer__link'>Return and Refund</div>
                <div className='public-footer__link'>Phone: +84 888 553 888</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
