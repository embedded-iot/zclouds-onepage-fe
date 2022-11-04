import React from 'react';
import { Col, Row } from 'antd';
import { events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import CategoriesFilters from './CategoriesFilters';
import TableGrid from 'components/Common/TableGrid';
import { CategoriesService } from 'services';
import CategoryItem from './CategoryItem';

import product_ex from 'images/product_ex.svg';

const items = [];

for (let i = 0; i < 30; i++) {
  items.push({
    avatar: product_ex,
    name: 'Creative graphic assets',
    price: 28,
    sizeCount: 6,
    colorCount: 12,
    printCount: 5
  })
}

const defaultData = {
  items,
  totalCount: items.length
}

const gridItemTemplate = ({ item, index }) => {
  return <CategoryItem {...item} />
}

export default function CategoriesGrid({ products, productType, serviceId }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    colSpan: 6,
    gridItemTemplate: gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page, productType: serviceType, serviceId: categoryId, ...restParams} = params || {};
      CategoriesService.getCategories({ ...restParams, page, size, serviceType, categoryId }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {};

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const onSelectGridItem = (selectItem) => {

  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onFiltersChange = filters => {
    reloadTable(filters);
  }
  const defaultParams = { productType, serviceId };
  return (
    <Row gutter={[10, 10]}>
      <Col span={ isMobile ? 24 : 6 }>
        <CategoriesFilters onChange={onFiltersChange} />
      </Col>
      <Col span={ isMobile ? 24 : 18 }>
        <TableGrid type='grid'
                   configs={gridConfig}
                   paginationConfig={paginationConfig}
                   actionButtonList={{}}
                   defaultParams={defaultParams}
                   defaultData={defaultData}
                   isShowPagination={true}
                   onSelectedItemsChange={onSelectedItemsChange}
                   onSelectGridItem={onSelectGridItem}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
      </Col>
    </Row>
  );
}
