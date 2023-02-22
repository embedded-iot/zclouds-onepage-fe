import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerUsersService } from 'services';
import { authentication, events } from 'utils';
import AddEditAccountStaffModal from './AddEditAccountStaffModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button, Col, Row } from 'antd';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-green-icon.svg';
import accountsStaff from 'images/user_cicrle_black_icon.svg';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import { EditOutlined } from '@ant-design/icons';
import PersonalInformationBox from './PersonalInformationBox';
import ChangePasswordBox from 'components/Seller/MyAccountBox/ChangePasswordBox';
import LastLoginBox from 'components/Seller/MyAccountBox/LastLoginBox';

import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { filterListByPermission } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';
import './style.scss';

const ACTION_KEYS = {
  ACTION_EVENTS: "MY_ACCOUNT_ACTION_EVENTS",
  ADD_ACCOUNT_STAFF: "ADD_ACCOUNT_STAFF",
  EDIT_ACCOUNT_STAFF: "EDIT_ACCOUNT_STAFF",
}

const actionItems = [
  {
    key: ACTION_KEYS.EDIT_ACCOUNT_STAFF,
    label: "Update account staff",
    icon: <EditOutlined />,
  },
];

const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'id',
  },
  {
    title: 'User Name',
    dataIndex: 'username',
  },
  {
    title: 'Type',
    dataIndex: 'convertedRole',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Last Login',
    dataIndex: 'convertedLastLogin',
  },
  {
    title: 'Total Order',
    dataIndex: 'totalOrder',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag className="orders-table__status" value={record.status} label={convertedStatus}/>);
    }
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    },
    permission: authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_STAFF),
  },
];

export default function MyAccountBox({ currentUser, setGlobalStore,  RELOAD_EVENT_KEY = 'RELOAD_RESELLER_MY_ACCOUNT_TABLE_EVENT_KEY' }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddEditAccountStaff, setOpenAddEditAccountStaff] = useState(false);
  const [accountStaff, setAccountStaff] = useState(null);
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns: filterListByPermission(columns),
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerUsersService.getAccountsStaff({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
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

  const addAccountStaff = () => {
    setAccountStaff(null);
    setOpenAddEditAccountStaff(true);
  }

  const editAccountStaff = (selectedAccountStaff) => {
    setAccountStaff(selectedAccountStaff);
    setOpenAddEditAccountStaff(true);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: (
          <div className='display-flex display-flex--center-align-items'>
            <Icon src={accountsStaff} width={24} height={24}/>
            <span className="my-account__title">Accounts Staff</span>
          </div>
        )
      },
    ],
  }

  const buttonList = [
    <Button type="primary" ghost onClick={addAccountStaff} icon={<Icon src={plusIcon} width={18} height={18} />} >
      Add staff
    </Button>,
  ]

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_ACCOUNT_STAFF:
          editAccountStaff(record);
          break;
        default:
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

  const handleCurrentUserChange = updatedCurrentUser => {
    setGlobalStore({
      currentUser: {
        ...currentUser,
        ...updatedCurrentUser,
      }
    })
  }

  return (
    <>
      {
        authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_STAFF) && (
        <ButtonListWrapper buttonList={buttonList}
                           align={!isMobile && 'right'}
                           className={isMobile && 'box-card--mobile'}
        />
      )}
      <Row gutter={isMobile ? [0, 8] : [24, 24]}>
        <Col span={isMobile ? 24 : 12}>
          <PersonalInformationBox currentUser={currentUser} onChange={handleCurrentUserChange}/>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <Row gutter={isMobile ? [0, 8] : [24, 24]}>
            <Col span={24}>
              <ChangePasswordBox currentUser={currentUser} />
            </Col>
            <Col span={24}>
              <LastLoginBox currentUser={currentUser} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {
            authentication.getPermission(PERMISSION_VALUES.SELLER_VIEW_STAFFS) && (
              <TableGrid configs={tableConfig}
                         headerActionsConfig={headerActionsConfig}
                         paginationConfig={{}}
                         defaultParams={{}}
                         defaultData={{}}
                         isShowPagination={true}
                         isAllowSelection={false}
                         RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
              />
            )
          }
        </Col>
      </Row>
      {
        openAddEditAccountStaff && (
          <AddEditAccountStaffModal
            open={openAddEditAccountStaff}
            onOk={reloadTable}
            data={accountStaff}
            onCancel={() => { setOpenAddEditAccountStaff(false); }}
          />
        )
      }
    </>
  );
}
