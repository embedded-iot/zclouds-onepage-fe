import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import CategoriesFilters from './CategoriesFilters';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from './CategoryItem';

const gridItemTemplate = ({ item, index }) => {
  return <CategoryItem {...item} />
}

export default function CategoriesGrid({ searchTextKey = 'searchText', searchText, categoryId, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [17, 17],
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || 8,
    searchPlaceholder: 'Search in Object Mockups',
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, categoryId, ...restParams} = params || {};
      FrontUserCategoriesService.getCategories({ ...restParams, pageSize, pageNum, categoryId: !!categoryId ? categoryId : -1 }, successCallback, failureCallback)
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
    const { categoryName, categoryId, productName, productId } = selectItem;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${productName}/${categoryId}/${productId}`);
  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onFiltersChange = filters => {
    reloadTable(filters);
  }

  useEffect(() => {
    reloadTable({
      [searchTextKey] : searchText
    });
  }, [searchText, searchTextKey]);

  const defaultParams = {
    categoryId
  };
  return (
    <Row gutter={[45, 0]}>
      <Col span={ isMobile ? 24 : 6 }>
        <CategoriesFilters className={`${isMobile && 'box-card--mobile'}`} categoryId={categoryId} onChange={onFiltersChange} />
      </Col>
      <Col span={ isMobile ? 24 : 18 }>
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
