import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerStoresService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { ROUTERS, STORE_TYPE_LABEL_VALUE_OPTIONS, STORE_TYPE_LABELS, STORE_TYPE_VALUES } from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'convertedType',
  },
  {
    title: 'Store Name',
    dataIndex: 'name',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Secret',
    dataIndex: 'domain',
  },
];

export default function StoresTable({ type, redirectTo, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_STORE_TABLE_EVENT_KEY' }) {
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(null);
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, searchText, type, ...restParams} = params || {};
      SellerStoresService.getStores({ ...restParams, pageSize, pageNum, searchText, type }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedStore = ref.current.items.find(item => item.id === keys[0]);
    setSelectedStore(newSelectedStore);
  }

  const onStoreTypeChange = (type) => {
    reloadTable({ type })
  }

  const editStore = () => {
    redirectTo(ROUTERS.SELLER_STORES + `/${selectedStore.id}`);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button icon={<EditOutlined />} onClick={editStore}>Edit store</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            options={STORE_TYPE_LABEL_VALUE_OPTIONS}
            defaultValue={type || ''}
            onChange={onStoreTypeChange}
          />
        )
      },
      {
        type: 'pageNum',
      },
      {
        type: 'pageSize',
      },
      {
        type: 'searchButton',
      },
    ],
  }

  const actionItems = [
    {
      key: STORE_TYPE_VALUES.SHOPIFY,
      label: STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOPIFY],
    },
  ];


  const onActionItemClick = key => {
    redirectTo(ROUTERS.SELLER_INTEGRATIONS + `/${key}`);
  }
  return (
    <>
      {
        !type && (
          <ButtonListWrapper actionItems={actionItems}
                             align="right"
                             onActionItemClick={onActionItemClick}
                             actionButton={<Button>New Store<DownOutlined /></Button>}
          />
        )
      }
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{
                   type
                 }}
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
