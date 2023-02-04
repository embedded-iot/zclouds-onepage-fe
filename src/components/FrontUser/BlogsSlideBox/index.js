import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';
import { ROUTERS } from 'components/contants';
import './style.scss';

export default function BlogsSlideBox({ redirectTo }) {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = () => {
    FrontUserPostsService.getBlogs({}, response => {
      setBlogs(response.items);
    })
  }

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  const handleCLick = (data) => {
    redirectTo(ROUTERS.FRONT_USER_BLOGS + '/' + data.id)
  }

  return (
    <MultiCarouselView
      deviceType="desktop"
      containerClass="blog-slides__wrapper"
      itemClass="blog-card__item"
      responsive={{
        desktop: {
          items: 3,
        }
      }}
    >
      {
        blogs.map((blog) => <BlogSlideItem data={blog} onClick={handleCLick}/>)
      }
    </MultiCarouselView>
  )
}
