import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserPostsService } from 'services';
import PostItem from './PostItem';

const gridItemTemplate = ({ item, index }) => {
  return <PostItem {...item} />
}

export default function PostsGrid({ redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_POSTS_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [62, 0],
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || 8,
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      FrontUserPostsService.getPosts({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  return (
    <TableGrid type='grid'
               configs={gridConfig}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{
                 pageSize: 3,
               }}
               defaultData={{}}
               headerActionsConfig={{}}
               isShowPagination={true}
               onSelectedItemsChange={() => {}}
               onSelectGridItem={() => {}}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
