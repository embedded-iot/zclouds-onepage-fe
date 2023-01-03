import React, { useEffect, useState } from 'react';
import { AdminNotificationsService } from 'services';
import NotificationsBox from 'components/Share/NotificationsBox';
import { STATE_VALUES } from 'components/contants';

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = (params = {}) => {
    AdminNotificationsService.getNotifications({ pageNum: 1, pageSize: 1000, status: STATE_VALUES.ACTIVATED }, response => {
      setNotifications(response.items)
    }, () => {}, true)
  }

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, []);
  return (
    notifications.length ? <NotificationsBox items={notifications} /> : 'No notifications'
  )
}
