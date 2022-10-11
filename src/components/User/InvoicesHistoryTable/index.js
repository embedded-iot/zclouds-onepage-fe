import React from 'react';

import TableGrid from 'components/Common/TableGrid';
import { InvoiceUserService } from 'services';

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Người thực hiện',
    dataIndex: 'createdBy',
  },
  {
    title: 'Phương thức',
    dataIndex: 'conventedType',
  },
  {
    title: 'Số tiền',
    dataIndex: 'conventedCredit',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];

export default function InvoicesHistoryTable(props) {
  const RELOAD_EVENT_KEY = 'RELOAD_INVOICES_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize: size, pageNum: page} = params || {};
      InvoiceUserService.getInvoices({ page, size }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  return (
    <TableGrid tableConfig={tableConfig}
               paginationConfig={{}}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={false}
               onSelectedItemsChange={null}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
