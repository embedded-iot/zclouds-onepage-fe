import React from 'react';

import TableGrid from 'components/Common/TableGrid';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default function DepositHistoryTable(props) {

  const tableConfig = {
    getDataService: () => {},
    columns,
    successCallback: () => {
      return
    },
    failureCallback: () => {},
  };

  return (
    <TableGrid config={tableConfig}
               actionButtonList={[]}
    />
  );
}
