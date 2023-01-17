import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';
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
        blogs.map((blog) => <BlogSlideItem {...blog} />)
      }
    </MultiCarouselView>
  )
}
