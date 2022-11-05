import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserSKUService } from 'services';
import shirt_sku from 'images/t-shirt_sku.svg';
import { format } from 'utils';

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


const items = [];

for (let i = 0; i < 35; i++) {
  items.push({
    id: 1450,
    avatar: shirt_sku,
    name: 'Kids\' Sweater 3D',
    price: 28,
    attrs: [
      {
        "ID": 1003,
        "NAME": "Shipping",
        "VALUES": [
          {
            "ATTR_NAME": "Shipping",
            "ID": 6237,
            "SLUG": "yun-express",
            "VALUE": "Yun Express",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6238,
            "SLUG": "yunfast",
            "VALUE": "Yunfast",
            "PRICEADJUSTMENT": 10
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6239,
            "SLUG": "fedex",
            "VALUE": "FedEx",
            "PRICEADJUSTMENT": 20
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6240,
            "SLUG": "dhl",
            "VALUE": "DHL",
            "PRICEADJUSTMENT": 24
          }
        ]
      },
      {
        "ID": 1004,
        "NAME": "Size",
        "VALUES": [
          {
            "ATTR_NAME": "Size",
            "ID": 6241,
            "SLUG": "s",
            "VALUE": "S",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6242,
            "SLUG": "m",
            "VALUE": "M",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6243,
            "SLUG": "l",
            "VALUE": "L",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6244,
            "SLUG": "xl",
            "VALUE": "XL",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6245,
            "SLUG": "2xl",
            "VALUE": "2XL",
            "PRICEADJUSTMENT": 0
          }
        ]
      }
    ],
  })
}

const defaultData = {
  items,
  totalCount: items.length
}

export default function SKUTable() {
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const tableConfig = {
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


  return (
    <TableGrid configs={tableConfig}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={defaultData}
               isShowPagination={true}
               isShowSearch={true}
               isShowPageNum={true}
               isShowPageSize={true}
               onSelectedItemsChange={() => {}}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
