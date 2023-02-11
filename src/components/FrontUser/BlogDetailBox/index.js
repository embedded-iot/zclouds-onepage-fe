import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { FrontUserPostsService } from 'services';
import PlainText from 'components/Common/PlainText';
import { RESPONSIVE_MEDIAS} from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import BlogsGrid from 'components/FrontUser/BlogsGrid';
import ReactHtmlParser from 'react-html-parser';

import './style.scss';

export default function BlogDetailBox({ defaultBlog = null, blogCategoryId, blogId, redirectTo }) {
  const [blog, setBlog] = useState(defaultBlog);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const getBlogDetail = () => {
    FrontUserPostsService.getBlog(blogId, response => {
      setBlog(response);
    })
  }
  useEffect(() => {
    getBlogDetail();
    // eslint-disable-next-line
  }, [blogId]);

  if (!blog) {
    return null;
  }
  return (
    <div className={`${!isMobile && 'blog-detail-box__wrapper'}`}>
      <Row gutter={isMobile ? [0, 8] : [32, 0]}>
        <Col span={isMobile ? 24 : 18} className={isMobile && 'box-card--mobile'}>
          <div className='blog-detail-box__header-title'>{blog.headerTitle}</div>
          <div className='blog-detail-box__title'>{blog.title}</div>
          <div className='blog-detail-box__description'>{blog.description}</div>
        </Col>
      </Row>
      <Row gutter={isMobile ? [0, 8] : [32, 32]}>
        <Col span={isMobile ? 24 : 18} className={isMobile && 'box-card--mobile'}>
          <div className='blog-detail-box__image'>
            <img src={blog.image} alt={blog.title} />
          </div>
          <div className='blog-detail-box__content'>
            <PlainText type='TextArea'>
              {ReactHtmlParser(blog.content || '-')}
            </PlainText>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 6}>
          <BlogsGrid redirectTo={redirectTo}
                     showAll={true}
                     blogCategoryId={blogCategoryId}
          />
        </Col>
      </Row>
    </div>
  );
}
