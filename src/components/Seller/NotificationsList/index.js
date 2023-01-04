import React, { useEffect, useState } from 'react';
import { SellerNotificationsService } from 'services';
import NotificationsBox from 'components/Share/NotificationsBox';

export default function NotificationsList({ isExplain = true, redirectTo = () => {}, noData = '' }) {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = (params = {}) => {
    SellerNotificationsService.getNotifications({}, response => {
      setNotifications(SellerNotificationsService.getActivatedNotifications(response.items))
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
