import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminEmailsService, BaseService } from 'services';
import { authentication, cui, datetime, events } from 'utils';
import { Button, notification } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditEmailModal from './AddEditEmailModal';
import DeleteEmailModal from './DeleteEmailModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { DATETIME_FORMAT, PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import { downloadFile } from 'utils/requests';
import Icon from 'components/Common/Icon';
import exportIcon from 'images/export_green_purple_icon.svg';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Created Date',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.state} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_EMAIL: "ADD_EMAIL",
  EDIT_EMAIL: "EDIT_EMAIL",
  DELETE_EMAIL: "DELETE_EMAIL",
  EXPORT_EMAILS: "EXPORT_EMAILS",
}

export default function EmailsManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteEmail, setOpenDeleteEmail] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_EMAILS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminEmailsService.getEmails(cui.removeEmpty(params), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteEmail(false);
    setOpenAddEmail(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const exportEmails = () => {
    const params = selectedKeys.length ? { listOrderId: [...selectedKeys].join(',') } : { ...ref.current.params, }
    AdminEmailsService.exportEmails(params, response => {
      downloadFile(response, `emails_${datetime.convert(new Date(), DATETIME_FORMAT)}.xlsx`);
      notification.success({
        message: "Export emails successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Export emails failure!"),
      });
    })
  }

  const addEmail = () => {
    setIsEdit(false);
    setOpenAddEmail(true);
  }

  const editEmail = () => {
    setIsEdit(true);
    setOpenAddEmail(true);
  }

  const deleteEmail = () => {
    setOpenDeleteEmail(true);
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
    const newSelectedEmail = ref.current.items.find(item => item.id === keys[0]);
    setSelectedEmail(newSelectedEmail);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_EMAIL} icon={<EditOutlined />} onClick={editEmail}>Edit Email</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_EMAIL),
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_EMAIL} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteEmail}>Delete Email</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_EMAIL),
      },
      {
        type: 'custom',
        render: <div></div>,
        requiredSelection: false,
        permission: !isMobile,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EXPORT_EMAILS} type="primary" ghost icon={<Icon src={exportIcon} width={24} height={24} />} style={{ width: isMobile ? '100%' : 'auto' }}  onClick={exportEmails}>Export emails</Button>,
        span: 12,
        align: 'right',
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_EMAIL} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }}  onClick={addEmail}>Add Email</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_EMAIL),
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_EMAIL) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_EMAIL)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddEmail && (
          <AddEditEmailModal
            open={openAddEmail}
            data={isEdit ? selectedEmail : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddEmail(false); }}
          />
        )
      }
      {
        openDeleteEmail && (
          <DeleteEmailModal
            open={openDeleteEmail}
            data={selectedEmail}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteEmail(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
