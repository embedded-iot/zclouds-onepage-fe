import React, { useEffect, useState } from 'react';
import { SellerNotificationsService } from 'services';
import NotificationsBox from 'components/Share/NotificationsBox';
import { STATE_VALUES } from 'components/contants';

export default function NotificationsList({ isExplain = true, redirectTo = () => {}, noData = '' }) {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = (params = {}) => {
    SellerNotificationsService.getNotifications({ pageNum: 1, pageSize: 100, status: STATE_VALUES.IS_ACTIVE }, response => {
      setNotifications(response.items)
    }, () => {})
  }

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, []);
  return (
    notifications.length ? <NotificationsBox items={notifications} isExplain={isExplain} redirectTo={redirectTo}/> : noData
  )
}
