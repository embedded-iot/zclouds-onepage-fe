import React, { useRef, useEffect, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerStoresService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import {
  ROUTERS,
  STORE_TYPE_ICONS,
  STORE_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import Icon from 'components/Common/Icon';

import plusIcon from 'images/plus-icon.svg';
import searchGreenIcon from 'images/search_green.svg';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import CreateNewStoreModal from 'components/Seller/StoresTable/CreateNewStoreModal';

const ACTION_KEYS = {
  ACTION_EVENTS: "STORE_ACTION_EVENTS",
  ADD_STORE: "ADD_STORE",
  EDIT_STORE: "EDIT_STORE",
  MANUAL_SYNC_ORDERS: "MANUAL_SYNC_ORDERS",
}

const actionItems = [
  {
    key: ACTION_KEYS.EDIT_STORE,
    label: "Edit store",
  },
  {
    key: ACTION_KEYS.MANUAL_SYNC_ORDERS,
    label: 'Manual sync orders',
  },
];

const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'platform',
    render: (platform) => <Icon src={STORE_TYPE_ICONS[platform.toLowerCase()]} height={60} />
  },
  {
    title: 'Time',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Store Name',
    dataIndex: 'name',
  },
  {
    title: 'Creator',
    dataIndex: 'creator',
  },
  {
    title: 'Domain',
    dataIndex: 'domain',
    render: (domain) => <span className="link link--text">{domain}</span>
  },
  {
    title: 'Secret',
    dataIndex: 'secret',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    }
  },
];

export default function StoresTable({ type, redirectTo, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_STORE_TABLE_EVENT_KEY' }) {
  const [openCreateNewStore, setOpenCreateNewStore] = useState(false);
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerStoresService.getStores({ ...restParams, pageSize, pageNum, type }, successCallback, failureCallback)
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

  const onStoreTypeChange = (type) => {
    reloadTable({ type })
  }

  const editStore = (selectedStore) => {
    redirectTo(ROUTERS.SELLER_STORES + `/${selectedStore.id}`);
  }

  const createNewStore = () => {
    setOpenCreateNewStore(true);
  }

  const integrationOrders = (selectedStore) => {
    redirectTo(ROUTERS.SELLER_INTEGRATIONS + `/${selectedStore.platform.toLowerCase()}/orders/${selectedStore.id}/${selectedStore.name}`);
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_STORE:
          editStore(record);
          break;
        case ACTION_KEYS.MANUAL_SYNC_ORDERS:
          integrationOrders(record);
          break;
        default:
      }
    });
    return reloadListener;
  }

  useEffect(() => {
    reloadTable({ type });
    const reloadListener = actionListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, [type]);

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Search by name...',
          theme: 'light',
        }
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            options={STORE_TYPE_LABEL_VALUE_OPTIONS}
            defaultValue={type || ''}
            onChange={onStoreTypeChange}
            style={{width: 'auto'}}
            theme='light'
          />
        ),
        permission: !type
      },
      {
        type: 'pageNum',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'pageSize',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'searchButton',
        props: {
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        }
      },
      {
        type: 'custom',
        render: <Button type="primary" key={ACTION_KEYS.ADD_STORE} icon={<Icon src={plusIcon} width={24} height={24} />} onClick={createNewStore}>Create new store</Button>,
        permission: !type
      },
    ],
  }

  const integrationStore = ({ key }) => {
    setOpenCreateNewStore(false);
    redirectTo(ROUTERS.SELLER_INTEGRATIONS + `/${key}`);
  }
  return (
    <>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{
                   type
                 }}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openCreateNewStore && (
          <CreateNewStoreModal
            open={openCreateNewStore}
            onOk={integrationStore}
            onCancel={() => { setOpenCreateNewStore(false); }}
          />
        )
      }
    </>
  );
}
