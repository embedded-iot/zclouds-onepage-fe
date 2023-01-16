import React from 'react';
import TableGrid from 'components/Common/TableGrid';

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'orderNumber',
  },
  {
    title: 'Mockup',
    dataIndex: 'convertedMockupUrl',
    render: (convertedMockupUrl, record) => <img className="table-img__icon table-img__icon--circle" src={convertedMockupUrl} alt={record.name} />,
  },
  {
    title: 'Design',
    dataIndex: 'convertedDesignUrl',
    render: (convertedDesignUrl, record) => <img className="table-img__icon table-img__icon--circle" src={convertedDesignUrl} alt={record.name} />,
  },
  {
    title: 'Item Variant',
    dataIndex: 'orderProductSku',
  },
  {
    title: 'Shipping Full Name',
    dataIndex: 'shippingFullName',
  },
  {
    title: 'Item number',
    dataIndex: 'quantity',
  },
];

export default function OrderDataRowsTable({ items = [] }) {
  const tableConfig = {
    columns,
  };
  const defaultData = {
    items,
    totalCount: items.length,
  }
  return (
    <TableGrid configs={tableConfig}
               headerActionsConfig={{}}
               paginationConfig={{}}
               defaultParams={{}}
               isAllowUpdateDefaultData={true}
               defaultData={defaultData}
               isShowPagination={false}
               onSelectedItemsChange={() => {}}
    />
  )
}
