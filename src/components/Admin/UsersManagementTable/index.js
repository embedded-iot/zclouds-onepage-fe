import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminUsersService } from 'services';
import { cui, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import DeleteUserModal from './DeleteUserModal';
import DropdownSelect from 'components/Common/DropdownSelect';
import { ROLES_LABEL_VALUE_OPTIONS, ROUTERS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

const columns = [
  {
    title: 'User name',
    dataIndex: 'username',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Store Name',
    dataIndex: 'storeName',
  },
  {
    title: 'Role',
    dataIndex: 'convertedRole',
  },
  {
    title: 'State',
    dataIndex: 'convertedState',
  },
];

const ACTION_KEYS = {
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
}

export default function UsersManagementTable({ redirectTo }) {
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_USERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminUsersService.getUsers( cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteUser(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addEditUser = (userId = 0) => {
    redirectTo(ROUTERS.ADMIN_USERS_MANAGEMENT + '/' + userId)
  }

  const deleteUser = () => {
    setOpenDeleteUser(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedUser = ref.current.items.find(item => item.id === keys[0]);
    setSelectedUser(newSelectedUser);
  }
  const onRoleChange = (role) => {
    reloadTable({ role })
  }

  ROLES_LABEL_VALUE_OPTIONS[0].label = "All Role";
  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_USER} icon={<EditOutlined />} onClick={() => addEditUser(selectedUser.id)}>Edit user</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_USER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteUser}>Delete user</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, name...'
        }
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            options={ROLES_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onRoleChange}
            style={{width: 'auto'}}
          />
        ),
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
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_USER} type="primary" icon={<PlusCircleOutlined />} onClick={() => addEditUser()}>Add user</Button>,
        align: 'right',
      }
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
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openDeleteUser && (
          <DeleteUserModal
            open={openDeleteUser}
            data={selectedUser}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteUser(false); }}
          />
        )
      }
    </BoxCard>
  );
}
