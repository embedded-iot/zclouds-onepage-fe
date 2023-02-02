import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminNotificationsService } from 'services';
import { authentication, cui, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditNotificationModal from './AddEditNotificationModal';
import DeleteNotificationModal from './DeleteNotificationModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import PlainText from 'components/Common/PlainText';
import ReactHtmlParser from 'react-html-parser';
import { NOTIFICATION_STATE_LABEL_VALUE_OPTIONS, PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import { useMediaQuery } from 'react-responsive';

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
      return <PlainText type="TextArea">{ReactHtmlParser(content)}</PlainText>
    }
  },
  {
    title: 'English content',
    dataIndex: 'contentEnglish',
    render: (content) => {
      return <PlainText type="TextArea">{ReactHtmlParser(content)}</PlainText>
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
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddNotification, setOpenAddNotification] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_NOTIFICATIONS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminNotificationsService.getNotifications(cui.removeEmpty(params), successCallback, failureCallback)
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

  const notificationsOptions = NOTIFICATION_STATE_LABEL_VALUE_OPTIONS ;
  notificationsOptions[0].label = 'All Status';

  const handleFilterChange = (value, name) => {
    reloadTable({
      [name] : value
    });
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_NOTIFICATION} icon={<EditOutlined />} onClick={editNotification}>Edit notification</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_NOTIFICATION),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_NOTIFICATION} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteNotification}>Delete notification</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_NOTIFICATION),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, name...',
        }
      },
      {
        type: 'custom',
        requiredSelection: false,
        span: 24,
        render: (
          <DropdownSelect
            name="status"
            options={notificationsOptions}
            defaultValue={''}
            onChange={handleFilterChange}
            style={{ width: isMobile ? '100%' : 200}}
          />
        )
      },
      {
        type: 'searchButton',
        requiredSelection: false,
        span: 12,
        props: isMobile && {
          style: { width: '100%' }
        }
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_NOTIFICATION} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }} onClick={addNotification}>Add notification</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_NOTIFICATION),
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_NOTIFICATION) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_NOTIFICATION)}
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
    </BoxWrapper>
  );
}
