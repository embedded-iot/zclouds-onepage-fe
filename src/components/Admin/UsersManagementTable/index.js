import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminUsersService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditUserModal from './AddEditUserModal';
import DeleteUserModal from './DeleteUserModal';
import DropdownSelect from 'components/Common/DropdownSelect';
import { ROLES_LABEL_VALUE_OPTIONS } from 'components/contants';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'User name',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
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

export default function UsersManagementTable() {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_USERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminUsersService.getUsers({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
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
    setOpenAddUser(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addUser = () => {
    setIsEdit(false);
    setOpenAddUser(true);
  }

  const editUser = () => {
    setIsEdit(true);
    setOpenAddUser(true);
  }

  const deleteUser = () => {
    setOpenDeleteUser(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedUser = ref.current.items.find(item => item.id === keys[0]);
    setSelectedUser(newSelectedUser);
  }
  const onRoleChange = (type) => {
    reloadTable({ type })
  }

  ROLES_LABEL_VALUE_OPTIONS[0].label = "All Role";
  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_USER} icon={<EditOutlined />} onClick={editUser}>Edit user</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_USER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteUser}>Delete user</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            options={ROLES_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onRoleChange}
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
        render: <Button key={ACTION_KEYS.ADD_USER} type="primary" icon={<PlusCircleOutlined />} onClick={addUser}>Add user</Button>,
        align: 'right',
      }
    ],
  }

  return (
    <>
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
        openAddUser && (
          <AddEditUserModal
            open={openAddUser}
            data={isEdit ? selectedUser : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddUser(false); }}
          />
        )
      }
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
    </>
  );
}
