import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserSKUService } from 'services';

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
  },
];

export default function SKUTable() {
  const RELOAD_EVENT_KEY = 'RELOAD_SKU_TABLE_EVENT_KEY';
  const tableConfig = {
    searchPlaceholder: "Search in Object Mockups",
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page, searchText, ...restParams} = params || {};
      FrontUserSKUService.getSKUs({ ...restParams, page, size, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
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
