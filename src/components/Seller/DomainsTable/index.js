import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerDomainsService } from 'services';
import { authentication, cui,events } from 'utils';
import { Button} from 'antd';
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import AddEditDomainBox from './AddEditDomainBox';
import DeleteDomainModal from './DeleteDomainModal';
import BoxCard from 'components/Share/BoxCard';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import StatusCell from 'components/Share/StatusCell';

const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_DOMAIN: "ADD_DOMAIN",
  EDIT_DOMAIN: "EDIT_DOMAIN",
  DELETE_DOMAIN: "DELETE_DOMAIN",
}

const columns = [
  {
    title: 'Domain Name',
    dataIndex: 'name',
    render: (domain) => <span style={{ color: '#0066FF'}}>{domain}</span>
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusCell value={record.state} label={convertedStatus}/>);
    }
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      const handleClick = (key) => {
        events.publish(ACTION_KEYS.ACTION_EVENTS, {
          key,
          record,
        })
      }
      const buttonList = [
        authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_DOMAIN) && (
          <Button
            key={ACTION_KEYS.EDIT_DOMAIN}
            icon={<EditOutlined />}
            onClick={() => handleClick(ACTION_KEYS.EDIT_DOMAIN)}
          >
            Edit
          </Button>
        ),
        authentication.getPermission(PERMISSION_VALUES.SELLER_DELETE_DOMAIN) && (
          <Button
            danger

            icon={<MinusCircleOutlined />}
            onClick={() => handleClick(ACTION_KEYS.DELETE_DOMAIN)}
          >
            Remove
          </Button>
        )
      ]
      return (
        <ButtonListWrapper buttonList={buttonList} className="no-margin" />
      );
    }
  },
];

export default function DomainsTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openDeleteDomain, setOpenDeleteDomain] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  // eslint-disable-next-line
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
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onSelectedItemsChange = (keys) => {

  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
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
    ],
  }

  const editDomain = domain => {

  }

  const deleteDomain = domain => {
    setSelectedDomain(domain);
    setOpenDeleteDomain(true)
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_DOMAIN:
          editDomain(record);
          break;
        case ACTION_KEYS.DELETE_DOMAIN:
          deleteDomain(record);
          break;
        default:
      }
    });
    return reloadListener;
  }

  useEffect(() => {
    const reloadListener = actionListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <>
      <BoxWrapper className={!isMobile && 'card-box__wrapper'}>
        <TableGrid configs={tableConfig}
                   headerActionsConfig={headerActionsConfig}
                   paginationConfig={{}}
                   defaultParams={{}}
                   defaultData={{}}
                   isShowPagination={true}
                   isSingleSelection={true}
                   onSelectedItemsChange={onSelectedItemsChange}
                   isAllowSelection={false}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
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
      <BoxWrapper className={!isMobile && 'card-box__wrapper'}>
        {
          authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_DOMAIN) && (
            <AddEditDomainBox
              onOk={reloadTable}
            />
          )
        }
      </BoxWrapper>
    </>
  );
}
