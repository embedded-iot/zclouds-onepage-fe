import React from 'react';
import { ORDER_STATE_VALUES, STATE_COLORS, STATE_LABELS } from 'components/contants';
import { format } from 'utils';

import './style.scss';

export default function OrdersStatusList({ data = []}) {
  const items = ORDER_STATE_VALUES.map(statusValue => {
    const selectedOrderStatus = data.find(item => item.status === statusValue);
    return ({
      key: statusValue,
      label: `${STATE_LABELS[statusValue]} (${format.formatCurrency(selectedOrderStatus ? selectedOrderStatus.totalAmount : 0)})`,
      color: STATE_COLORS[statusValue],
      value: selectedOrderStatus ? selectedOrderStatus.orderCount : 0,
    })
  });

  return (
    <div className='order-status-list__wrapper'>
      {
        items.map((item) => (
          <div className='order-status-list__item' key={item.key}>
            <div className='order-status-list__item-label'>{item.label}</div>
            <div className='order-status-list__item-value' style={{ backgroundColor: item.color}}>{item.value}</div>
          </div>
        ))
      }
    </div>
  )
}
