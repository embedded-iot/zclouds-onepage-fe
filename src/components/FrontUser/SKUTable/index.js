import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import ProductOptionsView from 'components/Share/ProductOptionsView';
import { FrontUserCategoriesService } from 'services';
import { events, format } from 'utils';
import TableCellView from 'components/Share/TableCellView';

const RELOAD_EVENT_KEY = 'RELOAD_SKU_TABLE_EVENT_KEY';
const UPDATE_DATA_EVENT_KEY = 'UPDATE_SKU_PRICE_TABLE_EVENT_KEY';

const columns = [
  {
    title: '#',
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
];

export default function SKUTable() {

  const tableConfig = {
    searchPlaceholder: "Search in Object Mockups",
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      FrontUserCategoriesService.getCategories(params, successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
      },
      {
        type: 'pageNum',
      },
      {
        type: 'pageSize',
      },
      {
        type: 'searchButton',
      },
    ],
  }

  return (
    <TableGrid configs={tableConfig}
               headerActionsConfig={headerActionsConfig}
               paginationConfig={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={true}
               onSelectedItemsChange={() => {}}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
