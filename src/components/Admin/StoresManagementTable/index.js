import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminStoresService } from 'services';
import { authentication, events } from 'utils';
import {
  PERMISSION_VALUES,
  STORE_TYPE_ICONS,
  STORE_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import Icon from 'components/Common/Icon';

import searchGreenIcon from 'images/search_purple_icon.svg';
import BoxCard from 'components/Share/BoxCard';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditStoreModal from './EditStoreModal';
import StatusTag from 'components/Share/StatusTag';


const columns = [
  {
    title: 'Store ID',
    dataIndex: 'id',
  },
  {
    title: 'Platform Store',
    dataIndex: 'platform',
    render: (platform) => <Icon src={STORE_TYPE_ICONS[platform.toLowerCase()]} height={60} />
  },
  {
    title: 'Store Name',
    dataIndex: 'name',
  },
  {
    title: 'Owner',
    dataIndex: 'owners',
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
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.state} label={convertedStatus}/>);
    }
  },
];

export default function StoresManagementTable({ RELOAD_EVENT_KEY = 'RELOAD_ADMIN_STORES_MANAGEMENT_TABLE_EVENT_KEY' }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const [openUpdateStore, setOpenUpdateStore] = useState(false);
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      AdminStoresService.getStores({ ...restParams, pageSize, pageNum, type }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenUpdateStore(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onStoreTypeChange = (type) => {
    reloadTable({ type })
  }

  const editStore = () => {
    setOpenUpdateStore(true);
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
        props: {
          placeholder: 'Search by id, name...',
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            options={STORE_TYPE_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onStoreTypeChange}
            style={{width: 'auto'}}
            theme='light'
          />
        ),
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        props: {
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        },
        requiredSelection: false,
      },
    ],
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedStore = ref.current.items.find(item => item.id === keys[0]);
    setSelectedStore(newSelectedStore);
  }

  return (
    <BoxCard className="content-box__wrapper">
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_STORE)}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openUpdateStore && (
          <EditStoreModal
            open={openUpdateStore}
            data={selectedStore}
            onOk={reloadTable}
            onCancel={() => { setOpenUpdateStore(false); }}
          />
        )
      }
    </BoxCard>
  );
}
