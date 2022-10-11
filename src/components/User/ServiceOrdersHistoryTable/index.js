import React from 'react';
import OrdersHistoryTable from 'components/User/OrdersHistoryTable';

export default function ServiceOrdersHistoryTable({ products, productType, serviceId }) {
  return (
    <OrdersHistoryTable products={products}
                        productType={productType}
                        serviceId={serviceId}
    />
  );
}
