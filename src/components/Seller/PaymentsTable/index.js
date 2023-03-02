import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerPaymentsService } from 'services';
import { authentication, cui,events } from 'utils';
import { Button} from 'antd';
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import DeletePaymentModal from './DeletePaymentModal';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';

const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_PAYMENT: "ADD_PAYMENT",
  EDIT_PAYMENT: "EDIT_PAYMENT",
  DELETE_PAYMENT: "DELETE_PAYMENT",
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
  },
  {
    title: 'Active seller',
    dataIndex: 'activeSeller',
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
        authentication.getPermission(PERMISSION_VALUES.SELLER_ADD_EDIT_PAYMENT) && (
          <Button
            key={ACTION_KEYS.EDIT_PAYMENT}
            icon={<EditOutlined />}
            onClick={() => handleClick(ACTION_KEYS.EDIT_PAYMENT)}
          >
            Edit
          </Button>
        ),
        authentication.getPermission(PERMISSION_VALUES.SELLER_DELETE_PAYMENT) && (
          <Button
            danger

            icon={<MinusCircleOutlined />}
            onClick={() => handleClick(ACTION_KEYS.DELETE_PAYMENT)}
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

export default function PaymentsTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openDeletePayment, setOpenDeletePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  // eslint-disable-next-line
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_PAYMENTS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      SellerPaymentsService.getPayments(cui.removeEmpty(params), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeletePayment(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const onSelectedItemsChange = (keys) => {

  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [],
  }

  const editPayment = payment => {

  }

  const deletePayment = payment => {
    setSelectedPayment(payment);
    setOpenDeletePayment(true)
  }

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_PAYMENT:
          editPayment(record);
          break;
        case ACTION_KEYS.DELETE_PAYMENT:
          deletePayment(record);
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

  return (
    <>
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
        openDeletePayment && (
          <DeletePaymentModal
            open={openDeletePayment}
            data={selectedPayment}
            onOk={reloadTable}
            onCancel={() => { setOpenDeletePayment(false); }}
          />
        )
      }
    </>
  );
}
