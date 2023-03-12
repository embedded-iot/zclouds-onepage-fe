import React, { useEffect, useRef, useState } from 'react';
import { cui, events } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { SellerProductsService } from 'services';
import ProductItem from './ProductItem';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button, Col, Row } from 'antd';
import ViewProductPagesModal from './ViewProductPagesModal';
import PageHeader from 'components/Share/PageHeader';
import InputSearch from 'components/Common/InputSearch';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import Icon from 'components/Common/Icon';
import emailIcon from 'images/message_light_icon.svg';
import timeIcon from 'images/time_light_icon.svg';


import './style.scss';

const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  VIEW_PRODUCT_DETAIL: "VIEW_PRODUCT_DETAIL",
}

const gridItemTemplate = ({ item, redirectTo }) => {
  const handleActions = (key, record) => {
    events.publish(ACTION_KEYS.ACTION_EVENTS, {
      key,
      record,
    })
  }
  const buttonList = [
    <Button key={ACTION_KEYS.EDIT_PRODUCT} icon={<EditOutlined />} onClick={() => handleActions(ACTION_KEYS.VIEW_PRODUCT_DETAIL, item)}>Edit</Button>,
    <Button key={ACTION_KEYS.VIEW_PRODUCT_DETAIL} icon={<EyeOutlined /> } onClick={() => handleActions(ACTION_KEYS.VIEW_PRODUCT_DETAIL, item)}>View product pages</Button>,
  ]
  return (
    <ProductItem
      className="products-grid__product-item"
      src={item.featureImage}
      title={item.title}
      description={(
        <>
          <Row>
            <Col span={12} className="display-flex display-flex--center-align-items">
              <Icon src={emailIcon} width={24} height={24} />
              <span>Mail Support:</span>
            </Col>
            <Col span={12}>
              <span className="products-grid__product-item-value">{item.supportEmail}</span>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="display-flex display-flex--center-align-items">
              <Icon src={timeIcon} width={24} height={24} />
              <span>Date:</span>
            </Col>
            <Col span={12}>
              <span className="products-grid__product-item-value">{item.convertedUpdatedDate}</span>
            </Col>
          </Row>
        </>
      )}
      footer={ (
        <ButtonListWrapper
          buttonList={buttonList}
          fullWidth={true}
        />
      )}
    />
  )
}

export default function ProductsGrid({ redirectTo  = () => {} }) {
  let ref = useRef({});
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const gridConfig = {
    gutter: [24, 24],
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || isExTablet && 8 || 6,
    gridItemTemplate: (itemProps) => gridItemTemplate({ ...itemProps, redirectTo}),
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerProductsService.getProducts(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {

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


  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    buttonList: [],
  }

  const viewProductDetail = () => {
    setOpenProductDetail(true);
  }

  const addEditProduct = (isEdit = false) => {
    redirectTo(ROUTERS.SELLER_PRODUCTS + '/' + (isEdit ? selectedProduct.id :  0));
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      setSelectedProduct(record);
      switch (key) {
        case ACTION_KEYS.VIEW_PRODUCT_DETAIL:
          viewProductDetail(record);
          break;
        case ACTION_KEYS.EDIT_PRODUCT:
          addEditProduct(true);
          break;
        default:
      }
    });
    return reloadListener;
  }

  const onSearchChange = (value, name) => {
    if (!!ref.current.searchTimeout) {
      clearTimeout(ref.current.searchTimeout);
    }
    ref.current.searchTimeout = setTimeout(() => {
      reloadTable({ [name]: value });
    }, 500);
  };


  useEffect(() => {
    const reloadListener = actionListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="products-grid__wrapper">
      <div className='products-grid__add-product-box'>
        <PageHeader
          title="Products"
        />
        <div className="display-flex display-flex--center-align-items">
          <div className="products-grid__search-box">
            <InputSearch
              name="keyword"
              placeholder="Search product"
              onChange={onSearchChange}
            />
          </div>
          <Button type="primary" onClick={() => addEditProduct()}>Add Product</Button>
        </div>
      </div>
      <TableGrid type='grid'
                 configs={gridConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 actionButtonList={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 className="products-grid__product-grid"
                 isShowPagination={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openProductDetail && (
          <ViewProductPagesModal
            open={openProductDetail}
            onOk={reloadTable}
            redirectTo={redirectTo}
            data={!!selectedProduct ? selectedProduct : {} }
            onCancel={() => { setOpenProductDetail(false); }}
          />
        )
      }
    </div>
  );
}
