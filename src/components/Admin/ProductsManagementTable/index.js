import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminProductsService } from 'services';
import { authentication, events, format } from 'utils';
import { Button, Tooltip } from 'antd';
import DeleteProductModal from './DeleteProductModal';
import { CloseCircleOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ProductOptionsView from 'components/Share/ProductOptionsView';
import TableCellView from 'components/Share/TableCellView';
import BoxCard from 'components/Share/BoxCard';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import PlainText from 'components/Common/PlainText';
import StatusTag from 'components/Share/StatusTag';
import { useMediaQuery } from 'react-responsive';


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
    title: 'Design URL',
    dataIndex: 'designUrl',
    render: (designUrl) => !!designUrl ? <a href={designUrl} target='_blank' rel='noreferrer'>{designUrl}</a> : ''
  },
  {
    title: 'Variant',
    dataIndex: 'productOptions',
    width: '15%',
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
        className="table-cell__price-text"
        name="convertedPrice"
        initialValue={convertedPrice}
        UPDATE_VALUE_EVENT={UPDATE_DATA_EVENT_KEY + record.key}
      />
    )
  },
  {
    title: 'Description',
    dataIndex: 'description',
    // ellipsis: {
    //   showTitle: false,
    // },
    render: (description, record) => (
      <Tooltip placement="topLeft" title={(
        <PlainText type="TextArea">
          {description}
        </PlainText>
      )}>
        {description}
      </Tooltip>
    ),
  },
  {
    title: 'Display order',
    dataIndex: 'displayOrder',
  },
  {
    title: 'Status',
    dataIndex: 'convertedState',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.state} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
}

export default function ProductsManagementTable({ redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductKeys, setSelectedProductKeys] = useState([]);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_PRODUCTS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, searchText, ...restParams} = params || {};
      AdminProductsService.getProducts({ ...restParams, pageNum, pageSize, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteProduct(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addEditProduct = (isEdit = false) => {
    redirectTo(ROUTERS.ADMIN_PRODUCTS_MANAGEMENT + '/' + (isEdit ? selectedProduct.id :  0));
  }

  const deleteProduct = () => {
    setOpenDeleteProduct(true);
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedProductKeys(keys);
    const newSelectedProduct = ref.current.items.find(item => item.id === keys[0]);
    setSelectedProduct(newSelectedProduct);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_PRODUCT} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteProduct}>{`Delete product${selectedProductKeys.length > 1 ? 's' : ''}`}</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_PRODUCT),
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_PRODUCT} icon={<EditOutlined />} onClick={() => addEditProduct(true)}>Edit product</Button>,
        requiredSelection: true,
        permission: selectedProductKeys.length === 1 && authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, name...',
        }
      },
      {
        type: 'pageNum',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        span: 12,
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        requiredSelection: false,
        span: 12,
        props: isMobile && {
          style: { width: '100%' }
        }
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_PRODUCT} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto'}} onClick={() => addEditProduct()}>Add product</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT),
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
                 isSingleSelection={false}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={ authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_PRODUCT)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openDeleteProduct && (
          <DeleteProductModal
            open={openDeleteProduct}
            data={selectedProduct}
            productIds={selectedProductKeys}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteProduct(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
