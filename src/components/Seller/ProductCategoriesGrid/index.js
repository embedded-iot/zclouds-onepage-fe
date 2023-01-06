import React from 'react';
import { events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import CategoriesFilters from 'components/FrontUser/CategoriesGrid/CategoriesFilters';

import './style.scss';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-icon.svg';
import { Button } from 'antd';

const ACTION_KEYS = {
  ADD_ORDER: "ADD_DESIGN",
}


const gridItemTemplate = ({ item, redirectTo }) => {
  const addEditOrder = productId => {
    redirectTo(ROUTERS.SELLER_ORDERS + '/0/productId/' + productId );
  }
  const buttonList = [
    <Button key={ACTION_KEYS.ADD_ORDER} type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => addEditOrder(item.id)}>Order now</Button>
  ]
  return (
    <CategoryItem className="product-categories__product-item"
                  {...item}
                  allowClick={false}
                  showDes2={false}
                  footer={(
                    <ButtonListWrapper buttonList={buttonList}
                                       align="right"
                    />
                  )}
    />
  )
}

export default function ProductCategoriesGrid({ successCallback = () => {}, redirectTo  = () => {} }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [17, 17],
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || isExTablet && 8 || 6,
    gridItemTemplate: (itemProps) => gridItemTemplate({ ...itemProps, redirectTo}),
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, categoryId, ...restParams} = params || {};
      FrontUserCategoriesService.getCategories({ ...restParams, pageSize, pageNum, categoryId: !!categoryId ? categoryId : -1 }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      successCallback(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onFiltersChange = filters => {
    reloadTable(filters);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        requiredSelection: false,
        props: {
          placeholder: "Search by id, name..."
        }
      },
      {
        type: 'pageNum',
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        requiredSelection: false,
      },
    ]
  }

  return (
    <TableGrid type='grid'
               configs={gridConfig}
               headerActionsConfig={headerActionsConfig}
               secondHeader={(
                 <CategoriesFilters className="product-categories__category-list"
                                    onChange={onFiltersChange}
                                    formatCount={count => `(${count})`}
                                    showTitle={false}
                 />
               )}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={true}
               onSelectedItemsChange={onSelectedItemsChange}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
