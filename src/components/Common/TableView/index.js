import React from 'react';
import { Table } from 'antd';
import './style.scss';

const TableView = ({ className, ...restProps }) => {
  return (
    <Table className={`table-view__wrapper ${className}`}
           { ...restProps }
    />
  )
}


export default TableView;
