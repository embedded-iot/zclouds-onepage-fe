import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.scss';

export default function MultiCarouselView({ children, deviceType, containerClass, responsive, ...restProps }) {
  const responsiveProps = {
    desktop: {
      breakpoint: { max: 3000, min: 1366 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
      ...(responsive && responsive.desktop ? responsive.desktop : {})
    },
    x_tablet: {
      breakpoint: { max: 1366, min: 1124 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      ...(responsive && responsive.tablet ? responsive.tablet : {})
    },
    tablet: {
      breakpoint: { max: 1124, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      ...(responsive && responsive.tablet ? responsive.tablet : {})
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      ...(responsive && responsive.mobile ? responsive.mobile : {})
    }
  };
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass={`carousel-container ${containerClass}`}
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsiveProps}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      // customLeftArrow={<CaretLeftOutlined />}
      // customRightArrow={<CaretRightOutlined />}
      {...restProps}
    >
      {
        children
      }
    </Carousel>
  )
}
