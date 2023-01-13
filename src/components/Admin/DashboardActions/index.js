import React from 'react';
import { Button, notification } from 'antd';
import Icon from 'components/Common/Icon';
import exportIcon from 'images/export_green_purple_icon.svg';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { AdminDashboardService, BaseService } from 'services';
import { downloadFile } from 'utils/requests';
import { datetime } from 'utils';
import { DATETIME_FORMAT } from 'components/contants';

export default function DashboardActions() {
  const exportOrders = () => {
    AdminDashboardService.exportStatistics({}, response => {
      downloadFile(response, `dashboard-statistics_${datetime.convert(new Date(), DATETIME_FORMAT)}.xlsx`);
      notification.success({
        message: "Export dashboard statistics successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Export dashboard statistics failure!"),
      });
    })
  }
  const buttonList = [
    <Button type="primary" ghost icon={<Icon src={exportIcon} width={24} height={24} />} onClick={exportOrders}>Export statistics</Button>,
  ]
  return (
    <ButtonListWrapper buttonList={buttonList}
                       align="right"
    />
  )
}
