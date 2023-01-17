import React from 'react';
import { Table } from 'antd';
import './style.scss';

const TableView = (props) => {
  return (
    <Table className="table-view__wrapper"
           { ...props }
    />
  )
}


export default TableView;
