import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminStoresService } from 'services';
import { events } from 'utils';
import {
  STATE_COLORS,
  STORE_TYPE_ICONS,
  STORE_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import Icon from 'components/Common/Icon';

import searchGreenIcon from 'images/search_green.svg';
import BoxCard from 'components/Share/BoxCard';
import { Tag } from 'antd';


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
      return (<Tag className="stores-management-table__status-cell" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>);
    }
  },
  {
    title: 'Total order amount',
    dataIndex: 'totalOrder',
  },
  {
    title: 'Total paid amount',
    dataIndex: 'totalPaid',
  },
  {
    title: 'Total unpaid amount',
    dataIndex: 'totalUnpaid',
  },
];

export default function StoresManagementTable({ RELOAD_EVENT_KEY = 'RELOAD_ADMIN_STORES_MANAGEMENT_TABLE_EVENT_KEY' }) {
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      AdminStoresService.getStores({ ...restParams, pageSize, pageNum, type }, successCallback, failureCallback)
    },
    successCallback: (response) => {
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
            defaultValue={''}
            onChange={onStoreTypeChange}
            style={{width: 'auto'}}
            theme='light'
          />
        ),
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
    ],
  }

  return (
    <BoxCard className="content-box__wrapper">
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </BoxCard>
  );
}
