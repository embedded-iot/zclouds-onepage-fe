import React, { useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerIntegrationsService } from 'services';
import { notification, Tag } from 'antd';
import Icon from 'components/Common/Icon';
import searchGreenIcon from 'images/search_green.svg';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS, STORE_TYPE_ICONS } from 'components/contants';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';

import { authentication, events } from 'utils';
import { filterListByPermission } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';
import './style.scss';


const ACTION_KEYS = {
  ACTION_EVENTS: "INTEGRATION_ORDER_ACTION_EVENTS",
  CLONE_ORDER: "CLONE_ORDER",
}

const actionItems = [
  {
    key: ACTION_KEYS.CLONE_ORDER,
    label: "Order",
  },
];

const columns = [
  {
    title: 'Source',
    dataIndex: 'sourceName',
    render: (sourceName) => <Icon src={STORE_TYPE_ICONS[sourceName.toLowerCase()]} height={60} />
  },
  {
    title: 'Your Order ID',
    dataIndex: 'id',
  },
  {
    title: 'Financial',
    dataIndex: 'financialStatus',
    render: (financialStatus) => <Tag className="integration-orders-table__finance-status" color={financialStatus === 'paid' ? '#22A06B' : 'default'}>{financialStatus}</Tag>
  },
  {
    title: 'Date Create',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerFullName',
  },
  {
    title: 'Customer Email',
    dataIndex: 'customerEmail',
  },
  {
    title: 'Country',
    dataIndex: 'shippingAddressCountry',
  },
  {
    title: 'Items',
    dataIndex: 'totalQuantity',
  },
  {
    title: 'Total',
    dataIndex: 'convertedTotalLineItemsPrice',
    render: (convertedTotalLineItemsPrice) => <span className='table-cell__price-text'>{convertedTotalLineItemsPrice}</span>
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    },
    permission: authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_ORDER),
  },
];

export default function IntegrationOrdersTable({ type, storeId, successCallback = () => {}, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_STORE_TABLE_EVENT_KEY' }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns: filterListByPermission(columns),
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerIntegrationsService.getIntegrationOrders(type, storeId, { ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      successCallback(response);
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const cloneOrder = (selectedStore) => {
    SellerIntegrationsService.cloneOrder(type, storeId, selectedStore.id, response => {
      notification.success({
        message: "Clone order successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Clone order failure!"),
      });
    } )
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'searchText',
        span: 24,
        props: {
          placeholder: 'Search...',
          theme: 'light',
        }
      },
      {
        type: 'pageNum',
        span: 12,
        props: {
          theme: 'light',
        }
      },
      {
        type: 'pageSize',
        span: 12,
        props: {
          theme: 'light',
        }
      },
      {
        type: 'searchButton',
        span: 12,
        props: {
          style: isMobile ? { width: '100%' } : {},
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        }
      },
    ],
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      if (key === ACTION_KEYS.CLONE_ORDER) {
        cloneOrder(record);
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

  const defaultParams = {
    id: storeId
  };

  return (
    <>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={defaultParams}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </>
  );
}
