import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';

const gridItemTemplate = ({ item, index }) => {
  return <BlogSlideItem data={item} />
}

export default function BlogsGrid({ redirectTo }) {
  const [firstBlog, setFirstBlog] = useState(null);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: isMobile ? [0, 16] : [16, 16],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || 8,
    searchPlaceholder: 'Search in Object Mockups',
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, categoryId, ...restParams} = params || {};
      FrontUserPostsService.getBlogs({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      const { items = [], totalCount = 0 } = response || {};
      if (totalCount) {
        const [firstItem] = items;
        setFirstBlog(firstItem);
      }
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {};

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const onSelectGridItem = (selectItem) => {
    const { categoryName, categoryId, productName, productId } = selectItem;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${productName}/${categoryId}/${productId}`);
  }

  const defaultParams = {};
  return (
    <Row gutter={[0, 16]}>
      {
        !!firstBlog && (
          <Col span={24}>
            <BlogSlideItem data={firstBlog}
                           hasWrap={isMobile}
                           className={isMobile && 'box-card--mobile'}
            />
          </Col>
        )
      }
      <Col span={24}>
        <TableGrid type='grid'
                   configs={gridConfig}
                   paginationConfig={paginationConfig}
                   actionButtonList={{}}
                   defaultParams={defaultParams}
                   defaultData={{}}
                   headerActionsConfig={{}}
                   isShowPagination={true}
                   onSelectedItemsChange={onSelectedItemsChange}
                   onSelectGridItem={onSelectGridItem}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
      </Col>
    </Row>
  );
}
