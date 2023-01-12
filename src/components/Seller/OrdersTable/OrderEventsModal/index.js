import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import OrderEventsTimeLine from 'components/Share/OrderEventsTimeLine';
import { SellerOrdersService } from 'services';

export default function OrderEventsModal({ open, data, onCancel }) {
  const [orderEvents, setOrderEvents] = useState([]);
  const getOrderEvents = orderId => {
    SellerOrdersService.getOrderEvents(orderId, response => {
      setOrderEvents(response || []);
    })
  }
  useEffect(() => {
    if (data && data.id) {
      getOrderEvents(data.id);
    }
  }, [data])
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Order Event [${data && data.id}]`}
               hideOklBtn={true}
               onCancel={onCancel}
    >
      <div>
        { !!orderEvents.length ? <OrderEventsTimeLine events={orderEvents} /> : 'No events' }
      </div>
    </ModalView>
  )
}
