import React from 'react';
import { Button, Col, Row } from 'antd';
import CategoriesBox from 'components/FrontUser/CategoriesBox';

import './style.scss';

export default function BannerBox3({ customClass, redirectTo }) {
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-3__wrapper`}>
      <Row>
        <Col span={24} className="banner-box-3__center-box">
          <div className='banner-box-3__contents'>
            <div className='home-box__header-text'>
              WHAT WE SELL
            </div>
            <div className='home-box__title'>
              <span className="link link--text">300+ Custom Products</span> And More Are Frequently Added
            </div>
            <div className='home-box__description'>
              We are a printing and manufacturing system that helps you sell POD products and deliver directly to customers around the world.
            </div>
            <div className='home-box__checkbox-list banner-box-3__checkbox-list'>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Competitive Base Cost.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'> High standard product quality.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Automated tracking system. Minimize slow shipping of items.</div>
              </div>
            </div>
            <div className='home-box__buttons'>
              <Button>View all our products</Button>
            </div>
          </div>
        </Col>
        <Col span={24} className="home-box__img-box">
          <CategoriesBox redirectTo={redirectTo} />
        </Col>
      </Row>
    </div>
  )
}
