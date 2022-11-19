import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminProductsService } from 'services';
import { events, format } from 'utils';
import { Button } from 'antd';
import AddEditProductModal from './AddEditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { CloseCircleOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ProductOptionsView from 'components/Share/ProductOptionsView';
import TableCellView from 'components/Share/TableCellView';
import BoxCard from 'components/Share/BoxCard';


const UPDATE_DATA_EVENT_KEY = 'UPDATE_SKU_PRICE_TABLE_EVENT_KEY';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'avatar',
    render: (avatar, record) => <img className="table-img__icon" src={avatar} alt={record.name} />,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Variant',
    dataIndex: 'productOptions',
    render: (productOptions, record) => {
      const onProductOptionsChange = (selectedProductOptions) => {
        let calcPrice = record.price;
        let calSku = record.id;
        for (const [, value] of Object.entries(selectedProductOptions)) {
          calcPrice += value.priceAdjustment;
          calSku += '|' + value.slug;
        }
        events.publish(UPDATE_DATA_EVENT_KEY + record.key, {
          convertedPrice: format.formatCurrency(calcPrice),
          sku: calSku,
        })
      }
      return (
        <ProductOptionsView productOptions={productOptions}
                            onProductOptionsChange={onProductOptionsChange}
        />
      )
    },
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    width: '15%',
    render: (sku, record) => (
      <TableCellView
        className="table-img__sku-text"
        name="sku"
        initialValue={sku}
        UPDATE_VALUE_EVENT={UPDATE_DATA_EVENT_KEY + record.key}
      />
    )
  },
  {
    title: 'Price',
    dataIndex: 'convertedPrice',
    width: '12%',
    render: (convertedPrice, record) => (
      <TableCellView
        className="table-img__price-text"
        name="convertedPrice"
        initialValue={convertedPrice}
        UPDATE_VALUE_EVENT={UPDATE_DATA_EVENT_KEY + record.key}
      />
    )
  },
  {
    title: 'State',
    dataIndex: 'convertedState',
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
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_PRODUCTS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    searchTextKey: 'keyword',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page, searchText, ...restParams} = params || {};
      AdminProductsService.getProducts({ ...restParams, page, size, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenAddProduct(false);
    setOpenDeleteProduct(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addProduct = () => {
    setIsEdit(false);
    setOpenAddProduct(true);
  }

  const editProduct = () => {
    setIsEdit(true);
    setOpenAddProduct(true);
  }

  const deleteProduct = () => {
    setOpenDeleteProduct(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedCategory = ref.current.items.find(item => item.id === keys[0]);
    setSelectedProduct(newSelectedCategory);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_PRODUCT} icon={<EditOutlined />} onClick={editProduct}>Edit product</Button>,
        requiredSelection: true,
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_PRODUCT} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteProduct}>Delete product</Button>,
        requiredSelection: true,
      },
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
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_PRODUCT} type="primary" icon={<PlusCircleOutlined />} onClick={addProduct}>Add product</Button>,
        align: 'right',
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
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddProduct && (
          <AddEditProductModal
            open={openAddProduct}
            data={isEdit ? selectedProduct : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddProduct(false); }}
          />
        )
      }
      {
        openDeleteProduct && (
          <DeleteProductModal
            open={openDeleteProduct}
            data={selectedProduct}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteProduct(false); }}
          />
        )
      }
    </BoxCard>
  );
}
