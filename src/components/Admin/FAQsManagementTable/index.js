import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminFAQsService } from 'services';
import { authentication, cui, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditFAQModal from './AddEditFAQModal';
import DeleteFAQModal from './DeleteFAQModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import PlainText from 'components/Common/PlainText';
import ReactHtmlParser from 'react-html-parser';
import { PERMISSION_VALUES } from 'components/contants';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Question',
    dataIndex: 'question',
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    render: (answer) => {
      return <PlainText type="TextArea">{ReactHtmlParser(answer)}</PlainText>
    }
  },
  {
    title: 'Display order',
    dataIndex: 'displayOrder',
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
  ADD_FAQ: "ADD_FAQ",
  EDIT_FAQ: "EDIT_FAQ",
  DELETE_FAQ: "DELETE_FAQ",
}

export default function FAQsManagementTable() {
  const [openAddFAQ, setOpenAddFAQ] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteFAQ, setOpenDeleteFAQ] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_FAQS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminFAQsService.getFAQs(cui.removeEmpty(params), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteFAQ(false);
    setOpenAddFAQ(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addFAQ = () => {
    setIsEdit(false);
    setOpenAddFAQ(true);
  }

  const editFAQ = () => {
    setIsEdit(true);
    setOpenAddFAQ(true);
  }

  const deleteFAQ = () => {
    setOpenDeleteFAQ(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedFAQ = ref.current.items.find(item => item.id === keys[0]);
    setSelectedFAQ(newSelectedFAQ);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_FAQ} icon={<EditOutlined />} onClick={editFAQ}>Edit FAQ</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_FAQ),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_FAQ} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteFAQ}>Delete FAQ</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_FAQ),
      },
      {
        type: 'searchText',
        requiredSelection: false,
        props: {
          placeholder: 'Search by question...',
        }
      },
      {
        type: 'searchButton',
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_FAQ} type="primary" icon={<PlusCircleOutlined />} onClick={addFAQ}>Add FAQ</Button>,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_FAQ),
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_FAQ) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_FAQ)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddFAQ && (
          <AddEditFAQModal
            open={openAddFAQ}
            data={isEdit ? selectedFAQ : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddFAQ(false); }}
          />
        )
      }
      {
        openDeleteFAQ && (
          <DeleteFAQModal
            open={openDeleteFAQ}
            data={selectedFAQ}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteFAQ(false); }}
          />
        )
      }
    </BoxCard>
  );
}
