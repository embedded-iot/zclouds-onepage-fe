import React from 'react';
import { datetime } from 'utils';
import TimelineBox from 'components/Common/TimelineBox';
import { DATETIME_FORMAT, ORDER_EVENT_LABELS } from 'components/contants';

export default function OrderEventsTimeLine({ events }) {
  const items = events.map(event => ({
    label: datetime.convert(event.createdAt, DATETIME_FORMAT),
    children: <span>{ORDER_EVENT_LABELS[event.type] || event.type} {!!event.data && `[${event.data}]`}</span>
  }))
  return (
    <TimelineBox items={items} mode='left'/>
  )
}
