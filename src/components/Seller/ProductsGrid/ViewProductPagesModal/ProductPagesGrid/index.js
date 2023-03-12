import React, { useEffect, useState } from 'react';
import { cui, events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { SellerProductsService } from 'services';
import Icon from 'components/Common/Icon';
import timeIcon from 'images/time_light_icon.svg';
import ProductItem from 'components/Seller/ProductsGrid/ProductItem';
import { Space } from 'antd';


import './style.scss';

const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_PRODUCT_PAGE: "ADD_PRODUCT_PAGE",
  EDIT_PRODUCT_PAGE: "EDIT_PRODUCT_PAGE",
}

const gridItemTemplate = ({ item }) => {
  const handleActions = (key, record) => {
    events.publish(ACTION_KEYS.ACTION_EVENTS, {
      key,
      record,
    })
  }

  return (
    <ProductItem
      className="product-pages-grid__product-item"
      src={item.featureImage}
      title={(
        <Space size={[8, 8]} wrap>
          <span className={`product-pages-grid__product-item-status ${item.isPublished ? 'published' : 'draft' }`}>{item.convertedStatus}</span>
          <span className="cursor-pointer" onClick={() => handleActions(ACTION_KEYS.EDIT_PRODUCT_PAGE, item)}>{item.title}</span>
        </Space>
      )}
      description={(
        <>
          <div className="product-pages-grid__product-item-value">{item.supportEmail}</div>
          <div className="display-flex display-flex--center-align-items">
            <Icon src={timeIcon} width={24} height={24} />
            <span>Date:</span>
            <span className="product-pages-grid__product-item-value">{item.convertedUpdatedDate}</span>
          </div>
        </>
      )}
    />
  )
}

export default function ProductPagesGrid({ data, redirectToProductPage  = () => {} }) {
  // eslint-disable-next-line
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [24, 24],
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || isExTablet && 8 || 6,
    gridItemTemplate,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerProductsService.getProductPages(data.id, cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {

    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const onSelectedItemsChange = (selectedKeys) => {

  }

  // eslint-disable-next-line
  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    buttonList: [],
  }

  const addEditProductPage = (productPageId) => {
    redirectToProductPage(productPageId);
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      setSelectedProduct(record);
      switch (key) {
        case ACTION_KEYS.EDIT_PRODUCT_PAGE:
          addEditProductPage(record.id);
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
    <div className="product-pages-grid__wrapper">
      <TableGrid type='grid'
                 configs={gridConfig}
                 headerActionsConfig={headerActionsConfig}
                 actionButtonList={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 className="product-pages-grid__product-grid"
                 isShowPagination={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </div>
  );
}
