import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerOrdersService, SellerStoresService } from 'services';
import { cui, events, fileHelper } from 'utils';
import { Button, Tag } from 'antd';
import {
  EditOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import ImportOrdersModal from 'components/Seller/OrdersTable/ImportOrdersModal';
import {
  CLONE_DESIGN_LABEL_VALUE_OPTIONS,
  HAVE_DESIGN_LABEL_VALUE_OPTIONS,
  ORDER_STATE_VALUES,
  ROUTERS, SHIPPING_STATUS_LABEL_VALUE_OPTIONS, SORT_BY_LABEL_VALUE_OPTIONS,
  STATE_COLORS, STATE_LABELS, TRACKING_STATUS_LABEL_VALUE_OPTIONS, TYPE_DATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-icon.svg';
import downloadGreenIcon from 'images/download-green-icon.svg';
import searchGreenIcon from 'images/search_green.svg';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import DatePickerSelect from 'components/Common/DatePickerSelect';
import DropdownSelect from 'components/Common/DropdownSelect';


import './style.scss';
const ACTION_KEYS = {
  ACTION_EVENTS: "ACTION_EVENTS",
  ADD_ORDER: "ADD_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  IMPORT_ORDERS: "IMPORT_ORDERS",
  EXPORT_ORDERS: "EXPORT_ORDERS",
}

const actionItems = [
  {
    key: ACTION_KEYS.EDIT_ORDER,
    label: "Edit order",
    icon: <EditOutlined />,
  },
];

const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'id',
    render: (id, record) => <span>{id} - {record.orderNumber}</span>
  },
  {
    title: 'Mockup',
    dataIndex: 'convertedMockupUrl',
    render: (convertedMockupUrl, record) => <img className="table-img__icon table-img__icon--circle" src={convertedMockupUrl} alt={record.orderNumber} />,
  },
  {
    title: 'Order',
    dataIndex: 'order',
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
    dataIndex: 'customer',
  },
  {
    title: 'Tracking',
    dataIndex: 'tracking',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return <Tag className="orders-table__status" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>;
    }
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    }
  },
];


export default function OrdersTable({ redirectTo, successCallback = () => {}  }) {
  const [openImportOrders, setOpenImportOrders] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [filters, setFilters] = useState({});
  const [storesInput, setStoresInput] = useState({
    value: '',
    options: [],
  });
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_ORDERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerOrdersService.getOrders(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      successCallback(response);
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const exportOrders = () => {
    const selectedOrders = ref.current.items.filter(item => selectedKeys.includes(item.id));
    fileHelper.exportToExcel(selectedOrders, 'orders')
  }

  const importOrders = () => {
    setOpenImportOrders(true);
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

  const handleStoreInputSelect = (value, name) => {
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

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Keyword...',
          name: 'keyword'
        }
      },
      {
        type: 'inputText',
        props: {
          placeholder: 'Keyword...',
          name: 'id'
        }
      },
      {
        type: 'custom',
        render: (
          <AutoCompleteInput name="storeId"
                             value={storesInput.value}
                             onChange={handleStoreInputChange}
                             onSelect={handleStoreInputSelect}
                             placeholder={"All Stores"}
                             options={storesInput.options}
                             autoFilterOptions={false}
          />
        )
      },
      {
        type: 'custom',
        render: (
          <DatePickerSelect name="date"
                            value={storesInput.value}
                            onChange={handleDateChange}
          />
        )
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="haveTracking"
            options={TRACKING_STATUS_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="shippingStatus"
            options={SHIPPING_STATUS_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="haveDesign"
            options={HAVE_DESIGN_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="cloneDesign"
            options={CLONE_DESIGN_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'pageNum',
      },
      {
        type: 'pageSize',
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="typeDate"
            options={TYPE_DATE_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="orderBy"
            options={SORT_BY_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={handleFilterChange}
          />
        ),
      },
      {
        type: 'searchButton',
        props: {
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        }
      },
    ],
  }

  const buttonList = [
      ...(selectedKeys.length ? [<Button key={ACTION_KEYS.EXPORT_ORDERS} icon={<FileExcelOutlined />} onClick={exportOrders}>Export</Button>] : []),
    <Button key={ACTION_KEYS.IMPORT_ORDERS} type="primary" ghost icon={<Icon src={downloadGreenIcon} width={24} height={24} />} onClick={importOrders}>Import orders</Button>,
    <Button key={ACTION_KEYS.ADD_ORDER} type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => addEditOrder()}>Order</Button>
  ]

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_ORDER:
          addEditOrder(record);
          break;
        default:
      }
    });
    return () => {
      reloadListener && reloadListener.remove();
    };
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

  useEffect(() => {
    actionListenerFunc();
    getStoresOptions( {});
    // eslint-disable-next-line
  }, []);

  const StatusCheckboxOptions = ORDER_STATE_VALUES.map(state => ({
    label: <span style={{color: STATE_COLORS[state]}}>{STATE_LABELS[state]} (0)</span>,
    value: state,
  }));

  const StatusCheckboxGroup = (
    <div className="orders-table__status-checkbox-group">
      <CheckboxGroupBox options={StatusCheckboxOptions}
                        name="state"
                        value={filters.state || []}
                        onChange={handleFilterChange}
      />
    </div>
  );

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
      <TableGrid configs={tableConfig}
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
    </>
  );
}
