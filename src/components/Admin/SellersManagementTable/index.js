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
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';


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
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openUpdateSeller, setOpenUpdateSeller] = useState(false);
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
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
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button icon={<EditOutlined />} onClick={editSeller}>Edit seller</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        span: 24,
        props: {
          placeholder: 'Search by name...',
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        span: 12,
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        span: 12,
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        span: 12,
        props: {
          style: isMobile ? { width: '100%' } : {},
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

  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'}>
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
    </BoxWrapper>
  );
}
