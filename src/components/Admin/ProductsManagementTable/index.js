import React, { useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminProductsService } from 'services';
import { events, format } from 'utils';
import { Button } from 'antd';
import AddEditProductModal from './AddEditProductModal';
import DeleteProductModal from './DeleteProductModal';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'avatar',
    render: (avatar, record) => <img src={avatar} alt={record.name} />,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Variant',
    dataIndex: 'offerName',
  },
  {
    title: 'SKU',
    dataIndex: 'id',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (price) => format.formatCurrency(price),
  },
];

const ACTION_KEYS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
}

export default function ProductsManagementTable() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page, searchText, ...restParams} = params || {};
      AdminProductsService.getProducts({ ...restParams, page, size, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteProduct(false);
    setOpenDeleteProduct(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addProduct = () => {
    setIsEdit(false);
    setOpenAddProduct(true);
  }

  const onActionItemClick = (key) => {
    switch (key) {
      case ACTION_KEYS.DELETE_PRODUCT:
        setOpenDeleteProduct(true);
        break;
      default:
        setIsEdit(true);
        setOpenAddProduct(true);
    }
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedProduct({});
  }

  const headerActionsConfig = {
    buttonList: [
      <Button key={ACTION_KEYS.ADD_PRODUCT} onClick={addProduct}>Add product</Button>
    ],
    actionItems: [
      {
        key: ACTION_KEYS.EDIT_PRODUCT,
        label: 'Edit product',
      },
      {
        key: ACTION_KEYS.DELETE_PRODUCT,
        label: 'Delete products',
      },
    ],
    onActionItemClick,
    align: 'right',
  }

  return (
    <>
      <TableGrid configs={tableConfig}
                 paginationConfig={{}}
                 headerActionsConfig={headerActionsConfig}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      <AddEditProductModal
        open={openAddProduct}
        data={isEdit ? selectedProduct : null}
        onOk={reloadTable}
        onCancel={() => { setOpenAddProduct(false); }}
      />
      <DeleteProductModal
        open={openDeleteProduct}
        data={selectedProduct}
        onOk={reloadTable}
        onCancel={() => { setOpenDeleteProduct(false); }}
      />
    </>
  );
}
