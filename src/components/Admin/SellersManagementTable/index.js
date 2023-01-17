import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminResellersService } from 'services';
import { authentication, events } from 'utils';
import Icon from 'components/Common/Icon';

import searchGreenIcon from 'images/search_purple_icon.svg';
import BoxCard from 'components/Share/BoxCard';
import { Button } from 'antd';
import EditSellerModal from './EditSellerModal';
import { EditOutlined } from '@ant-design/icons';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES } from 'components/contants';


const columns = [
  {
    title: 'Seller ID',
    dataIndex: 'id',
  },
  {
    title: 'User Name',
    dataIndex: 'username',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Last Login',
    dataIndex: 'convertedLastLogin',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Store count',
    dataIndex: 'storeCount',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.state} label={convertedStatus}/>);
    }
  },
];

export default function SellersManagementTable({ RELOAD_EVENT_KEY = 'RELOAD_ADMIN_SELLERS_MANAGEMENT_TABLE_EVENT_KEY' }) {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openUpdateSeller, setOpenUpdateSeller] = useState(false);
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminResellersService.getResellers({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };
  const reloadTable = (filters ={}) => {
    setOpenUpdateSeller(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const editSeller = () => {
    setOpenUpdateSeller(true);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button icon={<EditOutlined />} onClick={editSeller}>Edit seller</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        props: {
          placeholder: 'Search by name...',
          theme: 'light',
        },
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
    const newSelectedSeller = ref.current.items.find(item => item.id === keys[0]);
    setSelectedSeller(newSelectedSeller);
  }

  return (
    <BoxCard className="content-box__wrapper">
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={true}
                 isSingleSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_USER)}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openUpdateSeller && (
          <EditSellerModal
            open={openUpdateSeller}
            data={selectedSeller}
            onOk={reloadTable}
            onCancel={() => { setOpenUpdateSeller(false); }}
          />
        )
      }
    </BoxCard>
  );
}
