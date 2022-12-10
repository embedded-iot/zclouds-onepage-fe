import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import {
  AdminOrdersService, AdminResellersService,
  AdminStoresService,
  BaseService,
} from 'services';
import { cui, events, fileHelper } from 'utils';
import { Button, notification, Tag } from 'antd';
import {
  EditOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import {
  CLONE_DESIGN_LABEL_VALUE_OPTIONS,
  HAVE_DESIGN_LABEL_VALUE_OPTIONS, ORDER_STATE_VALUES,
  SHIPPING_STATUS_LABEL_VALUE_OPTIONS, SORT_BY_LABEL_VALUE_OPTIONS,
  STATE_COLORS, STATE_LABELS, TRACKING_STATUS_LABEL_VALUE_OPTIONS, TYPE_DATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import Icon from 'components/Common/Icon';
import downloadGreenIcon from 'images/download-green-icon.svg';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import DatePickerSelect from 'components/Common/DatePickerSelect';
import DropdownSelect from 'components/Common/DropdownSelect';
import actionIcon from 'images/action-green-icon.svg';
import ImportOrdersModal from './ImportOrdersModal';
import UpdateOrderTrackingModal from './UpdateOrderTrackingModal';

import './style.scss';


const ACTION_KEYS = {
  ACTION_EVENTS: "ORDERS_ACTION_EVENTS",
  STATUS_EVENTS: "ORDERS_STATUS_EVENTS",
  UPDATE_ORDER_TRACKING: "UPDATE_ORDER_TRACKING",
  IMPORT_ORDERS: "IMPORT_ORDERS",
  EXPORT_ORDERS: "EXPORT_ORDERS",
}

const actionItems = [
  {
    key: ACTION_KEYS.UPDATE_ORDER_TRACKING,
    label: "Update order tracking",
    icon: <EditOutlined />,
  },
];

const statusItems = ORDER_STATE_VALUES.map(statusValue => ({
  key: statusValue,
  label: STATE_LABELS[statusValue],
  value: statusValue,
}));

const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'id',
    render: (id, record) => (
      <div>
        <span>{id} - {record.orderNumber}</span><br/>
        <span>{record.store && record.store.domain}</span><br/>
        <span>{record.productName} - {record.productInfoVariant || record.orderProductSku}</span>
      </div>
    )
  },
  {
    title: 'Mockup',
    dataIndex: 'convertedMockupUrl',
    render: (convertedMockupUrl, record) => <img className="table-img__icon table-img__icon--circle" src={convertedMockupUrl} alt={record.orderNumber} />,
  },
  {
    title: 'Design',
    dataIndex: 'convertedDesignUrl',
    render: (convertedDesignUrl, record) => <img className="table-img__icon table-img__icon--circle" src={convertedDesignUrl} alt={record.orderNumber} />,
  },
  {
    title: 'Design SKU',
    dataIndex: 'designSKU',
  },
  {
    title: 'Date order',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Price/Number',
    dataIndex: 'quantity',
    render: (quantity, record) => <span>{record.convertedProductPrice} * {quantity}</span>
  },
  {
    title: 'Product Price',
    dataIndex: 'convertedPriceTotal',
    render: (convertedPriceTotal) => <span className='table-cell__price-text'>{convertedPriceTotal}</span>
  },
  {
    title: 'Customer',
    dataIndex: 'customerFullName',
  },
  {
    title: 'Tracking',
    dataIndex: 'orderTracking',
    render: (orderTracking, record) => (
      <div>
        <span>Carrier: {record.convertedCarrier}</span>
        { !!orderTracking && !!record.convertedShippingStatus && <Tag>{record.convertedShippingStatus}</Tag> }
        <br/>
        <span>Tracking Num: {record.convertedTrackingNum}</span>
      </div>
    )
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (
        <ActionDropdownMenu items={statusItems}
                            record={record}
                            placement="top"
                            ACTION_EVENT_KEY={ACTION_KEYS.STATUS_EVENTS}
        >
          <Tag className="orders-management__status" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>
        </ActionDropdownMenu>
      );
    }
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return (
        <ActionDropdownMenu items={actionItems}
                            record={record}
                            ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS}
                            actionIcon={actionIcon}
        />
      );
    }
  },
];


export default function OrdersManagementTable({ redirectTo, successCallback = () => {}  }) {
  const [openImportOrders, setOpenImportOrders] = useState(false);
  const [openUpdateOrderTracking, setOpenUpdateOrderTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [filters, setFilters] = useState({});
  const [storesInput, setStoresInput] = useState({
    value: '',
    options: [],
  });
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_ORDERS_TABLE_EVENT_KEY';
  let ref = useRef({});

  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, listStatus, resellerId: sellerId, ...restParams} = params || {};
      AdminOrdersService.getOrders(cui.removeEmpty({ ...restParams, pageSize, pageNum, sellerId, listStatus: listStatus ? listStatus.join('|') : '' }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      successCallback(response);
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}, hasReloadStatus = false) => {
    setOpenImportOrders(false);
    setOpenUpdateOrderTracking(false);
    events.publish(RELOAD_EVENT_KEY, filters);
    if (hasReloadStatus) {
      getOrdersStatus();
    }
  }

  const exportOrders = () => {
    const selectedOrders = ref.current.items.filter(item => selectedKeys.includes(item.id));
    fileHelper.exportToExcel(selectedOrders, 'orders')
  }

  const importOrders = () => {
    setOpenImportOrders(true);
  }

  const updateOrderTracking = order => {
    setSelectedOrder(order);
    setOpenUpdateOrderTracking(true);
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
  }

  const handleFilterChange = (value, name) => {
    const newFilters = {
      ...filters,
      ...(typeof value === 'object' ? value : { [name]: value })
    }
    setFilters(newFilters);
    reloadTable(newFilters);
  }

  const handleStatusChange = (value, name) => {
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters);
    reloadTable(newFilters);
  }

  const handleAutoCompleteInputChange = (value, name) => {
    if (name === 'storeId') {
      setStoresInput({
        ...storesInput,
        value: value,
      });
    } else if (name === 'resellerId') {
      setResellersInput({
        ...storesInput,
        value: value,
      });
    }

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      if (name === 'storeId') {
        getStoresOptions({ keyword: value });
      } else if (name === 'resellerId') {
        getResellersOptions({ keyword: value });
      }
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }

  const handleDateChange = (date, dateString) => {
    if (!!date) {
      handleFilterChange({
        fromDate: dateString[0],
        toDate: dateString[1],
      });
    } else {
      handleFilterChange({
        fromDate: '',
        toDate: '',
      });
    }
  }

  const defaultSpan = 4;

  const headerActionsConfig = {
    allowRowLayout: true,
    gutter: [10, 10],
    className: 'orders-management__filters-box',
    buttonList: [
      {
        type: 'searchText',
        span: defaultSpan,
        props: {
          placeholder: 'Keyword...',
          name: 'keyword',
          theme: 'light',
        }
      },
      {
        type: 'inputText',
        span: defaultSpan,
        props: {
          placeholder: 'List Order ID...',
          name: 'listOrderId',
          theme: 'light',
        }
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <AutoCompleteInput name="storeId"
                             value={storesInput.value}
                             onChange={handleAutoCompleteInputChange}
                             onSelect={handleAutoCompleteInputSelect}
                             placeholder={"All Stores"}
                             options={storesInput.options}
                             autoFilterOptions={false}
                             theme='light'
          />
        )
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DatePickerSelect name="date"
                            value={storesInput.value}
                            onChange={handleDateChange}
                            theme='light'
          />
        )
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="haveTracking"
            options={TRACKING_STATUS_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="shippingStatus"
            options={SHIPPING_STATUS_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="haveDesign"
            options={HAVE_DESIGN_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="cloneDesign"
            options={CLONE_DESIGN_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'pageNum',
        span: defaultSpan,
        props: {
          theme: 'light',
        }
      },
      {
        type: 'pageSize',
        span: defaultSpan,
        props: {
          theme: 'light',
        }
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="typeDate"
            options={TYPE_DATE_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <DropdownSelect
            name="sortOrder"
            options={SORT_BY_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
          />
        ),
      },
      {
        type: 'custom',
        span: defaultSpan,
        render: (
          <AutoCompleteInput name="resellerId"
                             value={resellersInput.value}
                             onChange={handleAutoCompleteInputChange}
                             onSelect={handleAutoCompleteInputSelect}
                             placeholder={"All Resellers"}
                             options={resellersInput.options}
                             autoFilterOptions={false}
                             theme='light'
          />
        )
      },
      {
        type: 'searchButton',
      },
    ],
  }

  const buttonList = [
      ...(selectedKeys.length ? [<Button key={ACTION_KEYS.EXPORT_ORDERS} icon={<FileExcelOutlined />} onClick={exportOrders}>Export</Button>] : []),
    <Button key={ACTION_KEYS.IMPORT_ORDERS} type="primary" ghost icon={<Icon src={downloadGreenIcon} width={24} height={24} />} onClick={importOrders}>Import orders</Button>,
  ]

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.UPDATE_ORDER_TRACKING:
          updateOrderTracking(record);
          break;
        default:
      }
    });
    return reloadListener;
  }


  const statusListenerFunc = () => {
    let statusListener = null;
    statusListener = events.subscribe(ACTION_KEYS.STATUS_EVENTS, ({ key, record }) => {
      const data = {
        status: key
      }
      AdminOrdersService.updateOrderStatus(record.id, data , response => {
        notification.success({
          message: "Update order status successful!",
        });
        reloadTable({} , true);
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update order status failure!"),
        });
      })
    });
    return statusListener;
  }

  const getStoresOptions = (params = {}) => {
    AdminStoresService.getStores( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminStoresService.getStoresOptions(response.items, false);
      setStoresInput((prevStoresInput) => {
        return {
          ...prevStoresInput,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellersInput((prevState) => {
        return {
          ...prevState,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const getOrdersStatus = (params = {}) => {
    AdminOrdersService.getOrdersStatus(response => {
      setOrderStatus(response);
    }, () => {})
  }

  useEffect(() => {
    const reloadListener = actionListenerFunc();
    const statusListener = statusListenerFunc();
    getOrdersStatus();
    getStoresOptions( {});
    getResellersOptions( {});
    return () => {
      statusListener && statusListener.remove();
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  const StatusCheckboxOptions = ORDER_STATE_VALUES.map(statusValue => {
    const selectedOrderStatus = orderStatus.find(item => item.status === statusValue);
    return ({
      label: <span style={{color: STATE_COLORS[statusValue]}}>{STATE_LABELS[statusValue]} ({selectedOrderStatus ? selectedOrderStatus.orderCount : 0})</span>,
      value: statusValue,
    })
  });

  const StatusCheckboxGroup = (
    <div className="orders-management__status-checkbox-group">
      <CheckboxGroupBox options={StatusCheckboxOptions}
                        name="listStatus"
                        value={filters.listStatus || []}
                        onChange={handleStatusChange}
      />
    </div>
  );

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
      <TableGrid configs={tableConfig}
                 className="orders-management__table"
                 headerActionsConfig={headerActionsConfig}
                 secondHeader={StatusCheckboxGroup}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 // isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openImportOrders && (
          <ImportOrdersModal
            open={openImportOrders}
            onOk={reloadTable}
            onCancel={() => { setOpenImportOrders(false); }}
          />
        )
      }
      {
        openUpdateOrderTracking && (
          <UpdateOrderTrackingModal
            open={openUpdateOrderTracking}
            data={selectedOrder}
            onOk={reloadTable}
            onCancel={() => { setOpenUpdateOrderTracking(false); }}
          />
        )
      }
    </>
  );
}
