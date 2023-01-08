import React from 'react';
import { datetime } from 'utils';
import TimelineBox from 'components/Common/TimelineBox';
import { DATETIME_FORMAT } from 'components/contants';

export default function ShippingEventsTimeLine({ events }) {
  const items = events.map(event => ({
    label: datetime.convert(event.timestamp, DATETIME_FORMAT),
    children: <>The order: <b>{event.description || '-'}</b> {!!event.address && `(${event.address})`} successfully.</>
  }))
  return (
    <TimelineBox items={items} mode='left'/>
  )
}
