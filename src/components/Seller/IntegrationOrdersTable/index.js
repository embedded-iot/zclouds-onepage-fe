import React, { useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerIntegrationsService } from 'services';
import { notification, Tag } from 'antd';
import Icon from 'components/Common/Icon';
import searchGreenIcon from 'images/search_green.svg';
import { STORE_TYPE_ICONS } from 'components/contants';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';

import './style.scss';
import { events } from 'utils';


const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
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
    }
  },
];

export default function IntegrationOrdersTable({ type, storeId, successCallback = () => {}, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_STORE_TABLE_EVENT_KEY' }) {
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    columns,
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
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Search...',
        }
      },
      {
        type: 'pageNum',
      },
      {
        type: 'pageSize',
      },
      {
        type: 'searchButton',
        props: {
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
    return () => {
      reloadListener && reloadListener.remove();
    };
  }

  useEffect(() => {
    actionListenerFunc();
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
