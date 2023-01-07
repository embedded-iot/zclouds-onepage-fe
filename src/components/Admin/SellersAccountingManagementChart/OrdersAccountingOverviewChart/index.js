import React from 'react';
import ChartWrapper from 'components/Common/ChartWrapper';
import { datetime } from 'utils';
import { DATE_FORMAT } from 'components/contants';

export default function OrdersAccountingOverviewChart({ data = [], fromDate = datetime.getPreviousDay(new Date(), 6), toDate = new Date()}) {
  let currentDay = toDate;
  const categories = [];
  const revenueData = [];
  const costData = [];
  const ordersData = [];
  const profitData = [];
  while (currentDay >= fromDate) {
    const dateStr = datetime.convert(currentDay, DATE_FORMAT);
    categories.unshift(dateStr);
    currentDay = datetime.getPreviousDay(currentDay);
    const selectedDay = data.find(item => item.convertedOrderDate === dateStr);
    revenueData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
    costData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
    ordersData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
    profitData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
  }

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Orders overview',
      align: 'left',
      margin: 30,
      style: {
        fontSize: 20,
        fontFamily: 'helvetica',
        fontWeight: 600,
        color: '#2C3E5D',
      }
    },
    xAxis: {
      categories: categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        enabled: false,
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Revenue',
      color: '#0065FF',
      data: revenueData,
    }, {
      name: 'Cost',
      color: '#8270DB',
      data: costData,
    }, {
      name: 'Order',
      color: '#D97008',
      data: ordersData,
    }, {
      name: 'Profit',
      color: '#22A06B',
      data: profitData,
    }]
  }
  return (
    <ChartWrapper options={options} />
  );
}
