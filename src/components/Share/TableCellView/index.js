import React, { useEffect, useState } from 'react';
import { events } from 'utils';

export default function TableCellView({ name, className, initialValue, UPDATE_VALUE_EVENT, format,  }) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    let reloadListener = null;
    if (!!UPDATE_VALUE_EVENT) {
      reloadListener = events.subscribe(UPDATE_VALUE_EVENT, (payload = {}) => {
        setValue(payload[name])
      })
    }
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  return <span className={className}>{format ? format(value) : value}</span>;
}
