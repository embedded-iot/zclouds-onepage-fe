import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerIntegrationsService } from 'services';
import { Button, notification } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Source',
    dataIndex: 'sourceName',
  },
  {
    title: 'Your Order ID',
    dataIndex: 'id',
  },
  {
    title: 'Financial',
    dataIndex: 'financialStatus',
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
    dataIndex: 'totalLineItemsPrice',
  },
  {
    title: 'Total',
    dataIndex: 'totalQuantity',
  },
];

export default function IntegrationOrdersTable({ type, storeId, redirectTo, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_STORE_TABLE_EVENT_KEY' }) {
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(null);
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerIntegrationsService.getIntegrationOrders(type, storeId, { ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const onSelectedItemsChange = (keys) => {
    const newSelectedStore = ref.current.items.find(item => item.id === keys[0]);
    setSelectedStore(newSelectedStore);
  }

  const cloneOrder = () => {
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
        type: 'custom',
        render: <Button icon={<EditOutlined />} onClick={cloneOrder}>Order</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        requiredSelection: false,
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
    ],
  }
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
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </>
  );
}
