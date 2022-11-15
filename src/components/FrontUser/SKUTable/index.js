import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import ProductOptionsView from 'components/Share/ProductOptionsView';
import { FrontUserCategoriesService } from 'services';

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
    render: (productOptions) => <ProductOptionsView productOptions={productOptions} />,
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
  },
  {
    title: 'Price',
    dataIndex: 'convertedPrice',
    render: (convertedPrice) => <span className="table-img__price-text">{convertedPrice}</span>,
  },
];

export default function SKUTable() {
  const RELOAD_EVENT_KEY = 'RELOAD_SKU_TABLE_EVENT_KEY';
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
