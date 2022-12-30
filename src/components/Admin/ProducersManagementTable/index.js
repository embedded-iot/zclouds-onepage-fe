import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminProducersService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditProducerModal from './AddEditProducerModal';
import DeleteProducerModal from './DeleteProducerModal';
import BoxCard from 'components/Share/BoxCard';

const columns = [
  {
    title: 'Producer Name',
    dataIndex: 'name',
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
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    render: (website) => !!website ? <a href={website} target='_blank' rel='noreferrer'>{website}</a> : ''
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
  },
  {
    title: 'ID Card',
    dataIndex: 'idCard',
  },
  {
    title: 'State',
    dataIndex: 'convertedState',
  },
];

const ACTION_KEYS = {
  ADD_PRODUCER: "ADD_PRODUCER",
  EDIT_PRODUCER: "EDIT_PRODUCER",
  DELETE_PRODUCER: "DELETE_PRODUCER",
}

export default function ProducersManagementTable() {
  const [openAddProducer, setOpenAddProducer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteProducer, setOpenDeleteProducer] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_PRODUCERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminProducersService.getProducers({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteProducer(false);
    setOpenAddProducer(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addProducer = () => {
    setIsEdit(false);
    setOpenAddProducer(true);
  }

  const editProducer = () => {
    setIsEdit(true);
    setOpenAddProducer(true);
  }

  const deleteProducer = () => {
    setOpenDeleteProducer(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedProducer = ref.current.items.find(item => item.id === keys[0]);
    setSelectedProducer(newSelectedProducer);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_PRODUCER} icon={<EditOutlined />} onClick={editProducer}>Edit producer</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_PRODUCER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteProducer}>Delete producer</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        requiredSelection: false,
        props: {
          placeholder: "Keyword"
        }
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
        render: <Button key={ACTION_KEYS.ADD_PRODUCER} type="primary" icon={<PlusCircleOutlined />} onClick={addProducer}>Add producer</Button>,
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
        openAddProducer && (
          <AddEditProducerModal
            open={openAddProducer}
            data={isEdit ? selectedProducer : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddProducer(false); }}
          />
        )
      }
      {
        openDeleteProducer && (
          <DeleteProducerModal
            open={openDeleteProducer}
            data={selectedProducer}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteProducer(false); }}
          />
        )
      }
    </BoxCard>
  );
}
