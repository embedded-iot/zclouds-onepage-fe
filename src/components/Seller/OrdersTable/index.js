import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerOrdersService } from 'services';
import { events, fileHelper } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, ImportOutlined, FileExcelOutlined } from '@ant-design/icons';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import ImportOrdersModal from 'components/Seller/OrdersTable/ImportOrdersModal';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Order Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Mockup',
    dataIndex: 'mockup',
    render: (mockup, record) => <img className="table-img__icon table-img__icon--circle" src={mockup[0]} alt={record.name} />,
  },
  {
    title: 'Order',
    dataIndex: 'order',
    render: (order, record) => <img className="table-img__icon table-img__icon--circle" src={order[0]} alt={record.name} />,
  },
];

const ACTION_KEYS = {
  ADD_ORDER: "ADD_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  IMPORT_ORDERS: "IMPORT_ORDERS",
  EXPORT_ORDERS: "EXPORT_ORDERS",
}

export default function OrdersTable() {
  const [openImportOrders, setOpenImportOrders] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_ORDERS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerOrdersService.getOrders({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
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

  const addEditOrder = (orderId) => {
    console.log(orderId);
  }



  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_ORDER} icon={<EditOutlined />} onClick={addEditOrder}>Edit order</Button>,
        requiredSelection: true,
      },
      // {
      //   type: 'custom',
      //   render: <Button key={ACTION_KEYS.DELETE_ORDER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteOrder}>Delete order</Button>,
      //   requiredSelection: true,
      // },
      {
        type: 'searchText',
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        requiredSelection: false,
      },
    ],
  }

  const buttonList = [
      ...(selectedKeys.length ? [<Button key={ACTION_KEYS.EXPORT_ORDERS} icon={<FileExcelOutlined />} onClick={exportOrders}>Export</Button>] : []),
    <Button key={ACTION_KEYS.IMPORT_ORDERS} icon={<ImportOutlined />} onClick={importOrders}>Upload multi order</Button>,
    <Button key={ACTION_KEYS.ADD_ORDER} type="primary" icon={<PlusCircleOutlined />} onClick={addEditOrder}>Add order</Button>
  ]
  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
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
