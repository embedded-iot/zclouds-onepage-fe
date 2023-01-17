import React from 'react';

import './style.scss';

export default function OrdersAccountingStatus({ data = {}}) {
  return (
    <div className='orders-accounting-status__summary-box'>
      <div className='orders-accounting-status__summary-item'>
        Revenue:
        <span className='orders-accounting-status__summary-value orders-accounting-status__summary-value--first'>{data.convertedTotalRevenue || 0}</span>
      </div>
      <div className='orders-accounting-status__summary-item'>
        Cost:
        <span className='orders-accounting-status__summary-value orders-accounting-status__summary-value--second'>{data.convertedTotalCost || 0}</span>
      </div>
      <div className='orders-accounting-status__summary-item'>
        Order:
        <span className='orders-accounting-status__summary-value orders-accounting-status__summary-value--third'>{data.convertedTotalOrder || 0}</span>
      </div>
      <div className='orders-accounting-status__summary-item'>
        Profit:
        <span className='orders-accounting-status__summary-value orders-accounting-status__summary-value--fourth'>{data.convertedTotalProfit || 0}</span>
      </div>
    </div>
  )
}
