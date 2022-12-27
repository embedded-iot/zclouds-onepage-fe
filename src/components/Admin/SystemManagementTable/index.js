import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminSystemService } from 'services';
import { events } from 'utils';
import { Button, Tag } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditSystemModal from './AddEditSystemModal';
import DeleteSystemModal from './DeleteSystemModal';
import BoxCard from 'components/Share/BoxCard';
import { STATE_COLORS } from 'components/contants';

const columns = [
  {
    title: 'Config Name',
    dataIndex: 'configName',
  },
  {
    title: 'Config Value',
    dataIndex: 'configValue',
  },
  {
    title: 'Config Comment',
    dataIndex: 'configComment',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<Tag className="designs-management-table__status-cell" color={STATE_COLORS[record.configStatus] || 'default'}>{convertedStatus}</Tag>);
    }
  },
];

const ACTION_KEYS = {
  ADD_SYSTEM: "ADD_SYSTEM",
  EDIT_SYSTEM: "EDIT_SYSTEM",
  DELETE_SYSTEM: "DELETE_SYSTEM",
}

export default function SystemManagementTable() {
  const [openAddSystem, setOpenAddSystem] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteSystem, setOpenDeleteSystem] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_CATEGORIES_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminSystemService.getSystem({}, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteSystem(false);
    setOpenAddSystem(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addSystem = () => {
    setIsEdit(false);
    setOpenAddSystem(true);
  }

  const editSystem = () => {
    setIsEdit(true);
    setOpenAddSystem(true);
  }

  const deleteSystem = () => {
    setOpenDeleteSystem(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedSystem = ref.current.items.find(item => item.id === keys[0]);
    setSelectedSystem(newSelectedSystem);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_SYSTEM} icon={<EditOutlined />} onClick={editSystem}>Edit system</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_SYSTEM} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteSystem}>Delete system</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <div></div>,
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_SYSTEM} type="primary" icon={<PlusCircleOutlined />} onClick={addSystem}>Add system</Button>,
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
                 isShowPagination={false}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddSystem && (
          <AddEditSystemModal
            open={openAddSystem}
            data={isEdit ? selectedSystem : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddSystem(false); }}
          />
        )
      }
      {
        openDeleteSystem && (
          <DeleteSystemModal
            open={openDeleteSystem}
            data={selectedSystem}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteSystem(false); }}
          />
        )
      }
    </BoxCard>
  );
}
