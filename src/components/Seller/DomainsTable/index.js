import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerDomainsService } from 'services';
import { authentication, cui,events } from 'utils';
import { Button} from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditDomainModal from './AddEditDomainModal';
import DeleteDomainModal from './DeleteDomainModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

const columns = [
  {
    title: 'Domain',
    dataIndex: 'name',
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
  ADD_DOMAIN: "ADD_DOMAIN",
  EDIT_DOMAIN: "EDIT_DOMAIN",
  DELETE_DOMAIN: "DELETE_DOMAIN",
  EXPORT_DOMAINS: "EXPORT_DOMAINS",
}

export default function DomainsTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddDomain, setOpenAddDomain] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDomain, setOpenDeleteDomain] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  // eslint-disable-next-line
  const [selectedKeys, setSelectedKeys] = useState([]);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_DOMAINS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      SellerDomainsService.getDomains(cui.removeEmpty(params), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteDomain(false);
    setOpenAddDomain(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addDomain = () => {
    setIsEdit(false);
    setOpenAddDomain(true);
  }

  const editDomain = () => {
    setIsEdit(true);
    setOpenAddDomain(true);
  }

  const deleteDomain = () => {
    setOpenDeleteDomain(true);
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
    const newSelectedDomain = ref.current.items.find(item => item.id === keys[0]);
    setSelectedDomain(newSelectedDomain);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_DOMAIN} icon={<EditOutlined />} onClick={editDomain}>Edit Domain</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_DOMAIN),
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_DOMAIN} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteDomain}>Delete Domain</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.SELLER_DELETE_DOMAIN),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by domain...',
        }
      },
      {
        type: 'pageNum',
        span: 12,
        requiredSelection: false,
        align: 'right',
      },
      {
        type: 'pageSize',
        span: 12,
        requiredSelection: false,
        align: 'right',
      },
      {
        type: 'searchButton',
        span: 12,
        requiredSelection: false,
        props: isMobile && {
          style: { width: '100%' }
        },
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_DOMAIN} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }}  onClick={addDomain}>Add Domain</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_DOMAIN),
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_DOMAIN) ||
                   authentication.getPermission(PERMISSION_VALUES.SELLER_DELETE_DOMAIN)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddDomain && (
          <AddEditDomainModal
            open={openAddDomain}
            data={isEdit ? selectedDomain : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddDomain(false); }}
          />
        )
      }
      {
        openDeleteDomain && (
          <DeleteDomainModal
            open={openDeleteDomain}
            data={selectedDomain}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteDomain(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
