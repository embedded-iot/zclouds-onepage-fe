import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminBanksService } from 'services';
import { authentication, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditBankModal from './AddEditBankModal';
import DeleteBankModal from './DeleteBankModal';
import BoxCard from 'components/Share/BoxCard';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

const columns = [
  {
    title: 'Type',
    dataIndex: 'convertedType',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bankName',
  },
  {
    title: 'Account Name',
    dataIndex: 'accountName',
  },
  {
    title: 'Account Number',
    dataIndex: 'accountNumber',
  },
  {
    title: 'Transfer Content',
    dataIndex: 'transferContent',
  },
];

const ACTION_KEYS = {
  ADD_BANK: "ADD_BANK",
  EDIT_BANK: "EDIT_BANK",
  DELETE_BANK: "DELETE_BANK",
}

export default function CategoriesManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddBank, setOpenAddBank] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteBank, setOpenDeleteBank] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_CATEGORIES_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminBanksService.getBanks({}, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteBank(false);
    setOpenAddBank(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addBank = () => {
    setIsEdit(false);
    setOpenAddBank(true);
  }

  const editBank = () => {
    setIsEdit(true);
    setOpenAddBank(true);
  }

  const deleteBank = () => {
    setOpenDeleteBank(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedBank = ref.current.items.find(item => item.id === keys[0]);
    setSelectedBank(newSelectedBank);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_BANK} icon={<EditOutlined />} onClick={editBank}>Edit bank</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BANK),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_BANK} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteBank}>Delete bank</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BANK),
      },
      {
        type: 'custom',
        render: <div></div>,
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_BANK} type="primary" icon={<PlusCircleOutlined />} onClick={addBank}>Add bank</Button>,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BANK),
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
                 isShowPagination={false}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BANK) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BANK)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddBank && (
          <AddEditBankModal
            open={openAddBank}
            data={isEdit ? selectedBank : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddBank(false); }}
          />
        )
      }
      {
        openDeleteBank && (
          <DeleteBankModal
            open={openDeleteBank}
            data={selectedBank}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteBank(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
