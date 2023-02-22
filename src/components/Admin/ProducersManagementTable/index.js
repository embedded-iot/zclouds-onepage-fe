import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminProducersService } from 'services';
import { authentication, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditProducerModal from './AddEditProducerModal';
import DeleteProducerModal from './DeleteProducerModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

const columns = [
  {
    title: 'Producer Name',
    dataIndex: 'producerName',
  },
  {
    title: 'Phone',
    dataIndex: 'producerNumber',
  },
  {
    title: 'Email',
    dataIndex: 'producerEmail',
  },
  {
    title: 'Address',
    dataIndex: 'producerAddress',
  },
  {
    title: 'Website',
    dataIndex: 'producerWebsite',
    render: (website) => !!website ? <a href={website} target='_blank' rel='noreferrer'>{website}</a> : ''
  },
  {
    title: 'Contact',
    dataIndex: 'convertedProducerMessaging',
    render: (convertedProducerMessaging) => {
      return (
        <>
          {
            convertedProducerMessaging.map((item, index) => {
              return (
                <div key={index}>
                  {item.messagingApp} - {item.producerMessagingName.startsWith('http') ? <a href={item.producerMessagingName} target='_blank' rel='noreferrer'>{item.producerMessagingName}</a> : item.producerMessagingName}
                </div>
              )
            })
          }
        </>
      )
    }
  },
  {
    title: 'ID Card',
    dataIndex: 'producerIdCard',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.status} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_PRODUCER: "ADD_PRODUCER",
  EDIT_PRODUCER: "EDIT_PRODUCER",
  DELETE_PRODUCER: "DELETE_PRODUCER",
}

export default function ProducersManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddProducer, setOpenAddProducer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteProducer, setOpenDeleteProducer] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_PRODUCERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
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
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_PRODUCER} icon={<EditOutlined />} onClick={editProducer}>Edit producer</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCER),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_PRODUCER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteProducer}>Delete producer</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_PRODUCER),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: "Search by id, name..."
        }
      },
      {
        type: 'pageNum',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        span: 12,
        requiredSelection: false,
        props: {
          style: isMobile ? { width: '100%' } : {}
        }
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_PRODUCER} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }} onClick={addProducer}>Add producer</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCER),
      }
    ],
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
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCER) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_PRODUCER)}
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
    </BoxWrapper>
  );
}