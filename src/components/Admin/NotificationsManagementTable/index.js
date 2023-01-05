import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminNotificationsService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditNotificationModal from './AddEditNotificationModal';
import DeleteNotificationModal from './DeleteNotificationModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import PlainText from 'components/Common/PlainText';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Created Date',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Vietnamese content',
    dataIndex: 'contentVietnamese',
    render: (content) => {
      return <PlainText type="TextArea">{content}</PlainText>
    }
  },
  {
    title: 'English content',
    dataIndex: 'contentEnglish',
    render: (content) => {
      return <PlainText type="TextArea">{content}</PlainText>
    }
  },
  {
    title: 'Updated Date',
    dataIndex: 'convertedUpdatedDate',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.configStatus} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  EDIT_NOTIFICATION: "EDIT_NOTIFICATION",
  DELETE_NOTIFICATION: "DELETE_NOTIFICATION",
}

export default function NotificationsManagementTable() {
  const [openAddNotification, setOpenAddNotification] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_NOTIFICATIONS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminNotificationsService.getNotifications(params, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteNotification(false);
    setOpenAddNotification(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addNotification = () => {
    setIsEdit(false);
    setOpenAddNotification(true);
  }

  const editNotification = () => {
    setIsEdit(true);
    setOpenAddNotification(true);
  }

  const deleteNotification = () => {
    setOpenDeleteNotification(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedNotification = ref.current.items.find(item => item.id === keys[0]);
    setSelectedNotification(newSelectedNotification);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_NOTIFICATION} icon={<EditOutlined />} onClick={editNotification}>Edit notification</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_NOTIFICATION} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteNotification}>Delete notification</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <div></div>,
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_NOTIFICATION} type="primary" icon={<PlusCircleOutlined />} onClick={addNotification}>Add notification</Button>,
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
        openAddNotification && (
          <AddEditNotificationModal
            open={openAddNotification}
            data={isEdit ? selectedNotification : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddNotification(false); }}
          />
        )
      }
      {
        openDeleteNotification && (
          <DeleteNotificationModal
            open={openDeleteNotification}
            data={selectedNotification}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteNotification(false); }}
          />
        )
      }
    </BoxCard>
  );
}
