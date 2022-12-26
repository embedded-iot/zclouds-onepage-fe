import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerOrdersService, SellerStoresService } from 'services';
import { cui, events } from 'utils';
import { Button, notification, Tag } from 'antd';
import {
  EditOutlined,
  SendOutlined,
  CopyOutlined
} from '@ant-design/icons';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import ImportOrdersModal from 'components/Seller/OrdersTable/ImportOrdersModal';
import {
  CLONE_DESIGN_LABEL_VALUE_OPTIONS,
  HAVE_DESIGN_LABEL_VALUE_OPTIONS, ORDER_STATE_VALUES,
  ROUTERS, SHIPPING_STATUS_LABEL_VALUE_OPTIONS, SORT_BY_LABEL_VALUE_OPTIONS,
  STATE_COLORS, STATE_LABELS, TRACKING_STATUS_LABEL_VALUE_OPTIONS, TYPE_DATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-icon.svg';
import exportIcon from 'images/export_green_icon.svg';
import importIcon from 'images/import_green_icon.svg';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import DatePickerSelect from 'components/Common/DatePickerSelect';
import DropdownSelect from 'components/Common/DropdownSelect';
import TrackingEventModal from './TrackingEventModal';

import './style.scss';


const ACTION_KEYS = {
  ACTION_EVENTS: "ORDERS_ACTION_EVENTS",
  ADD_ORDER: "ADD_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  CLONE_ORDER: "DUPLICATE_ORDER",
  IMPORT_ORDERS: "IMPORT_ORDERS",
  EXPORT_ORDERS: "EXPORT_ORDERS",
  VIEW_TRACKING: "VIEW_TRACKING",
}


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
        <span>Tracking Num: {!!orderTracking ? <a href={`https://t.17track.net/en#nums=${orderTracking.trackingNumber}`} target='_blank' rel='noreferrer'>{record.convertedTrackingNum}</a> : record.convertedTrackingNum}</span>
      </div>
    )
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<Tag className="orders-table__status" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>);
    }
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      const actionItems = [
        {
          key: ACTION_KEYS.EDIT_ORDER,
          label: "Edit order",
          icon: <EditOutlined />,
        },
        {
          key: ACTION_KEYS.CLONE_ORDER,
          label: "Duplicate order",
          icon: <CopyOutlined />
        },
        {
          key: ACTION_KEYS.VIEW_TRACKING,
          label: "View tracking events",
          icon: <SendOutlined />,
          disabled: !record.orderTracking,
        },
      ];
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    }
  },
];


export default function OrdersTable({ redirectTo, successCallback = () => {}  }) {
  const [openImportOrders, setOpenImportOrders] = useState(false);
  const [openTrackingEvents, setOpenTrackingEvents] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [filters, setFilters] = useState({});
  const [storesInput, setStoresInput] = useState({
    value: '',
    options: [],
  });
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_ORDERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const onRowEvents = (record, rowIndex) => {
    return {
      onDoubleClick: event => {
        events.publish(ACTION_KEYS.ACTION_EVENTS, {
          key: ACTION_KEYS.EDIT_ORDER,
          record,
        })
      }
    };
  };
  const tableConfig = {
    columns,
    onRow: onRowEvents,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, listStatus, ...restParams} = params || {};
      const requestParams = cui.removeEmpty({ ...restParams, pageSize, pageNum, listStatus: listStatus ? listStatus.join('|') : '' });
      ref.current.params = requestParams;
      SellerOrdersService.getOrders(requestParams, successCallback, failureCallback)
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
    events.publish(RELOAD_EVENT_KEY, filters);
    if (hasReloadStatus) {
      getOrdersStatus();
    }
  }

  const exportOrders = () => {
    const params = selectedKeys.length ? { listOrderId: [...selectedKeys].join(',') } : { ...ref.current.params, }
    SellerOrdersService.exportOrders(params, redirectLink => {
      if (!!redirectLink) {
        window.location.href = redirectLink;
      }
      notification.success({
        message: "Export orders successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Export orders failure!"),
      });
    })
  }

  const importOrders = () => {
    setOpenImportOrders(true);
  }

  const viewTrackingEvent = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    setOpenTrackingEvents(true);
  }

  const addEditOrder = (selectedOrder = {}) => {
    redirectTo(ROUTERS.SELLER_ORDERS + '/' + (selectedOrder.id || 0));
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

  const handleStoreInputChange = (value, name) => {
    setStoresInput({
      ...storesInput,
      value: value,
    });
    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getStoresOptions({ keyword: value });
    }, 200);
  }

  const handleStoreInputSelect = (value, options, name) => {
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
    className: 'orders-table__filters-box',
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
                             onChange={handleStoreInputChange}
                             onSelect={handleStoreInputSelect}
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
        span: 3,
        props: {
          theme: 'light',
        }
      },
      {
        type: 'custom',
        span: 3,
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
        span: 3,
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
        type: 'searchButton',
      },
    ],
  }

  const cloneOrder = (selectedOrder) => {
    SellerOrdersService.cloneOrder( selectedOrder.id, response => {
      notification.success({
        message: "Duplicate order successful!",
      });
      reloadTable();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Duplicate order failure!"),
      });
    })
  }

  const buttonList = [
    <Button key={ACTION_KEYS.EXPORT_ORDERS} type="primary" ghost icon={<Icon src={exportIcon} width={24} height={24} />} onClick={exportOrders}>Export orders</Button>,
    <Button key={ACTION_KEYS.IMPORT_ORDERS} type="primary" ghost icon={<Icon src={importIcon} width={24} height={24} />} onClick={importOrders}>Import orders</Button>,
    <Button key={ACTION_KEYS.ADD_ORDER} type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => addEditOrder()}>Order</Button>
  ]

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_ORDER:
          addEditOrder(record);
          break;
        case ACTION_KEYS.CLONE_ORDER:
          cloneOrder(record);
          break;
        case ACTION_KEYS.VIEW_TRACKING:
          viewTrackingEvent(record);
          break;
        default:
      }
    });
    return reloadListener;
  }

  const getStoresOptions = (params = {}) => {
    SellerStoresService.getStores( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = SellerStoresService.getStoresOptions(response.items, false);
      setStoresInput((prevStoresInput) => {
        return {
          ...prevStoresInput,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const getOrdersStatus = (params = {}) => {
    SellerOrdersService.getOrdersStatus(response => {
      setOrderStatus(response);
    }, () => {})
  }

  useEffect(() => {
    const reloadListener = actionListenerFunc();
    getOrdersStatus();
    getStoresOptions( {});
    return () => {
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
    <div className="orders-table__status-checkbox-group">
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
                 className="orders-table__table"
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
        openTrackingEvents && (
          <TrackingEventModal
            open={openTrackingEvents}
            onOk={reloadTable}
            data={!!selectedOrder && !!selectedOrder.orderTracking ? selectedOrder.orderTracking : {} }
            onCancel={() => { setOpenTrackingEvents(false); }}
          />
        )
      }
    </>
  );
}
