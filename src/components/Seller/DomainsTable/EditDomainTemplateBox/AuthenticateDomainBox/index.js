import React from 'react';
import { Button } from 'antd';
import TableGrid from 'components/Common/TableGrid';

import './style.scss';


const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Host',
    dataIndex: 'host',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

export default function AuthenticateDomainBox() {
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      // AdminBanksService.getBanks({}, successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };
  return (
    <div className='authenticate-domain-box__wrapper'>
      <div className='authenticate-domain-box__for-email'>
        <div className='authenticate-domain-box__for-email-label'>
          Authenticate Your Domain For Email<br/>
          Vào phần quản lý dns của domain, cập nhật record dưới đây và nhấn active
        </div>
        <Button type='primary'>Verify</Button>
      </div>
      <TableGrid configs={tableConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={false}
                 isSingleSelection={true}
                 isShowIndex={false}
      />
    </div>
  )
}
