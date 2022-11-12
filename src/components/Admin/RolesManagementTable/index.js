import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminRolesService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditRoleModal from './AddEditRoleModal';
import DeleteRoleModal from './DeleteRoleModal';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Role Name',
    dataIndex: 'name',
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
  },
  {
    title: 'Permissions',
    dataIndex: 'permission',
  },
  {
    title: 'Admins count',
    dataIndex: 'adminCount',
  },
];

const ACTION_KEYS = {
  ADD_ROLE: "ADD_ROLE",
  EDIT_ROLE: "EDIT_ROLE",
  DELETE_ROLE: "DELETE_ROLE",
}

export default function RolesManagementTable() {
  const [openAddRole, setOpenAddRole] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteRole, setOpenDeleteRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_ROLES_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, searchText, ...restParams} = params || {};
      AdminRolesService.getRoles({ ...restParams, pageSize, pageNum, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteRole(false);
    setOpenAddRole(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addRole = () => {
    setIsEdit(false);
    setOpenAddRole(true);
  }

  const editRole = () => {
    setIsEdit(true);
    setOpenAddRole(true);
  }

  const deleteRole = () => {
    setOpenDeleteRole(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedRole = ref.current.items.find(item => item.id === keys[0]);
    setSelectedRole(newSelectedRole);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_ROLE} icon={<EditOutlined />} onClick={editRole}>Edit role</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_ROLE} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteRole}>Delete role</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
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
        render: <Button key={ACTION_KEYS.ADD_ROLE} type="primary" icon={<PlusCircleOutlined />} onClick={addRole}>Add role</Button>,
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
      <AddEditRoleModal
        open={openAddRole}
        data={isEdit ? selectedRole : null}
        onOk={reloadTable}
        onCancel={() => { setOpenAddRole(false); }}
      />
      <DeleteRoleModal
        open={openDeleteRole}
        data={selectedRole}
        onOk={reloadTable}
        onCancel={() => { setOpenDeleteRole(false); }}
      />
    </>
  );
}
