import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { STATE_LABELS } from 'components/contants';
import ShippingEventsTimeLine from 'components/Share/ShippingEventsTimeLine';
import { cui } from 'utils';

export default function TrackingEventModal({ open, data, onCancel }) {
  const shippingEvents = cui.parseStringObject(data.shippingEvent || '[]', []);
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Shipping Event"}
               hideOklBtn={true}
               onCancel={onCancel}
    >
      <div>
        <span>Tracking Number: {!!data.trackingNumber ? <a href={`https://t.17track.net/en#nums=${data.trackingNumber}`} target='_blank' rel='noreferrer'>{data.trackingNumber}</a> : ''}</span><br/>
        <span>Carrier: {!!data.carrier ? data.carrier : ''}</span><br/>
        <span>Carrier Supply: {!!data.carrier ? data.carrier : ''}</span><br/>
        <span>Shipping Status: {!!data.shippingStatus ? data.shippingStatus : ''}</span><br/>
        <span>Destination: {!!data.shippingStatus ? STATE_LABELS[data.shippingStatus] : ''}</span><br/><br/>
        { !!shippingEvents.length ? <ShippingEventsTimeLine events={shippingEvents} /> : '' }
      </div>
    </ModalView>
  )
}
