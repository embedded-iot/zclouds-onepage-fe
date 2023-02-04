import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';

const gridItemTemplate = ({ item }) => {
  return <BlogSlideItem data={item} />
}

export default function BlogsGrid({ redirectTo, showAll = false }) {
  const [firstBlog, setFirstBlog] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';

  const handleCLick = (data) => {
    redirectTo(ROUTERS.FRONT_USER_BLOGS + '/' + data.id)
  }

  const gridConfig = {
    gutter: showAll || isMobile ? [0, 16] : [16, 16],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: (showAll || isMobile) && 24 || isTablet && 12 || 8,
    searchPlaceholder: 'Search in Object Mockups',
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, categoryId, ...restParams} = params || {};
      FrontUserPostsService.getBlogs({ ...restParams, pageSize, pageNum }, response => {
        if (showAll) {
          successCallback(response);
          return;
        }
        const { items = [], totalCount = 0 } = response || {};
        const [firstItem, ...restItems] = items;
        if (totalCount) {
          setFirstBlog(firstItem);
        }
        setTotalCount(totalCount);
        successCallback({ items: restItems, totalCount });
      }, failureCallback, )
    },
    successCallback: (response) => {

    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {};

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const onSelectGridItem = (selectItem) => {
    handleCLick(selectItem)
  }

  const defaultParams = {};

  if (showAll) {
    return (
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
    )
  }

  return (
    <Row gutter={[0, 16]}>
      {
        !!firstBlog && (
          <Col span={24}>
            <BlogSlideItem data={firstBlog}
                           hasWrap={isMobile}
                           className={isMobile && 'box-card--mobile'}
                           onClick={handleCLick}
            />
          </Col>
        )
      }
      <Col span={24}>
        {
          totalCount !== 1 && (
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
          )
        }
      </Col>
    </Row>
  );
}
