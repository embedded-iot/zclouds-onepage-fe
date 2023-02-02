import React, { useEffect, useState } from 'react';
import { authentication, events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import CategoriesFilters from 'components/FrontUser/CategoriesGrid/CategoriesFilters';

import './style.scss';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-icon.svg';
import { Button } from 'antd';
import ProductDetailModal from './ProductDetailModal';
import infoIcon from 'images/info_black_icon.svg';

const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_ORDER: "ADD_DESIGN",
  VIEW_PRODUCT_DETAIL: "VIEW_PRODUCT_DETAIL",
}

const gridItemTemplate = ({ item, redirectTo }) => {
  const addEditOrder = productId => {
    redirectTo(ROUTERS.SELLER_ORDERS + '/0/productId/' + productId );
  }
  const viewProductDetail = record => {
    events.publish(ACTION_KEYS.ACTION_EVENTS, {
      key: ACTION_KEYS.VIEW_PRODUCT_DETAIL,
      record,
    })
  }
  const buttonList = [
    <Button key={ACTION_KEYS.VIEW_PRODUCT_DETAIL} icon={<Icon src={infoIcon} width={24} height={24} /> } onClick={() => viewProductDetail(item)}>View details</Button>,
    authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_ORDER) && <Button key={ACTION_KEYS.ADD_ORDER} type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => addEditOrder(item.id)}>Order now</Button>
  ]
  return (
    <CategoryItem className="product-categories__product-item"
                  {...item}
                  allowClick={false}
                  showDes2={false}
                  footer={ (
                    <ButtonListWrapper buttonList={buttonList}
                                       align="right"
                    />
                  )}
    />
  )
}

export default function ProductCategoriesGrid({ successCallback = () => {}, redirectTo  = () => {} }) {
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [16, 16],
    className: isMobile && 'box-card--mobile',
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
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: "Search by id, name..."
        }
      },
      {
        type: 'pageNum',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        requiredSelection: false,
      },
    ],
  }

  const viewProductDetail = product => {
    setSelectedProduct(product);
    setOpenProductDetail(true);
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.VIEW_PRODUCT_DETAIL:
          viewProductDetail(record);
          break;
        default:
      }
    });
    return reloadListener;
  }

  useEffect(() => {
    const reloadListener = actionListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <TableGrid type='grid'
                 configs={gridConfig}
                 headerActionsConfig={headerActionsConfig}
                 secondHeader={(
                   <CategoriesFilters className={`product-categories__category-list ${isMobile && 'box-card--mobile'}`}
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
      {
        openProductDetail && (
          <ProductDetailModal
            open={openProductDetail}
            onOk={reloadTable}
            redirectTo={redirectTo}
            data={!!selectedProduct ? selectedProduct : {} }
            onCancel={() => { setOpenProductDetail(false); }}
          />
        )
      }
    </>
  );
}
