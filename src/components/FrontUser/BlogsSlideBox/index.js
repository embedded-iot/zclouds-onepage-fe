import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import './style.scss';
import { useMediaQuery } from 'react-responsive';

export default function BlogsSlideBox({ redirectTo }) {
  const [blogs, setBlogs] = useState([]);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
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
    const { id, title, blogCategoryId, blogCategory = {}} = data;
    redirectTo(ROUTERS.FRONT_USER_BLOGS + `/${encodeURIComponent(blogCategory ? blogCategory.name : 'Blog Category')}/${encodeURIComponent(title)}/${blogCategoryId || -1}/${id}`)
  }

  // eslint-disable-next-line
  const imageHeight = isMobile && 250 || isTablet && 250 || isExTablet && 200 ||  270;
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
        blogs.map((blog) => <BlogSlideItem data={blog} onClick={handleCLick} imageHeight={imageHeight}/>)
      }
    </MultiCarouselView>
  )
}
