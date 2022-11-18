import React from 'react';
import { Button, Col, Row } from 'antd';
import BlogsSlideBox from 'components/FrontUser/BlogsSlideBox';
import SignUpBannerBox from 'components/FrontUser/SignUpBannerBox';

import './style.scss';

export default function BannerBox6({ customClass, redirectTo }) {
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-6__wrapper`}>
      <Row>
        <Col span={24} className="banner-box-6__center-box">
          <div className='banner-box-6__contents'>
            <div className='home-box__header-text'>
              LATEST CONTENT
            </div>
            <div className='home-box__title'>
              <span className="link link--text banner-box-6__link">Blogs</span> And News
            </div>
            <div className='home-box__description'>
              Quickly connect with your store. You can even integrate Lenful with your management system using the API.
            </div>
            <div className='banner-box-6__blog-list'>
              <BlogsSlideBox
                redirectTo={redirectTo}
              />
            </div>
            <div className='banner-box-6__buttons'>
              <Button>See more posts</Button>
            </div>
            <SignUpBannerBox />
          </div>
        </Col>
      </Row>
    </div>
  )
}
