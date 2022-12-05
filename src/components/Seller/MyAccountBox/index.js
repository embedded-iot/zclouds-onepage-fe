import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerUsersService } from 'services';
import { events } from 'utils';
import AddEditAccountStaffModal from './AddEditAccountStaffModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button, Col, Row } from 'antd';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-green-icon.svg';
import accountsStaff from 'images/user_cicrle_black_icon.svg';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import { EditOutlined } from '@ant-design/icons';
import PersonalInformationBox from './PersonalInformationBox';

import './style.scss';

const ACTION_KEYS = {
  ACTION_EVENTS: "MY_ACCOUNT_ACTION_EVENTS",
  ADD_ACCOUNT_STAFF: "ADD_ACCOUNT_STAFF",
  EDIT_ACCOUNT_STAFF: "EDIT_ACCOUNT_STAFF",
}

const actionItems = [
  {
    key: ACTION_KEYS.ADD_ACCOUNT_STAFF,
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
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    }
  },
];

export default function MyAccountBox({ currentUser, RELOAD_EVENT_KEY = 'RELOAD_RESELLER_MY_ACCOUNT_TABLE_EVENT_KEY' }) {
  const [openAddEditAccountStaff, setOpenAddEditAccountStaff] = useState(false);
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    columns,
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
    setOpenAddEditAccountStaff(true);
  }

  const headerActionsConfig = {
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

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
                         className="my-account__button-list"
      />
      <Row gutter={[23, 23]}>
        <Col span={12}>
          <PersonalInformationBox currentUser={currentUser} />
        </Col>
        <Col span={12}>
          <Row gutter={[23, 23]}>
            <Col span={24}>
            </Col>
            <Col span={24}>
ádassfdsf
            </Col>
          </Row>
        </Col>
      </Row>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddEditAccountStaff && (
          <AddEditAccountStaffModal
            open={openAddEditAccountStaff}
            onOk={reloadTable}
            onCancel={() => { setOpenAddEditAccountStaff(false); }}
          />
        )
      }
    </>
  );
}
