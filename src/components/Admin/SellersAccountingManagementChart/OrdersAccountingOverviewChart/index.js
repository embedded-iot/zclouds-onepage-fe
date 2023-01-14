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
    revenueData.unshift(!!selectedDay ? selectedDay.revenue : 0);
    costData.unshift(!!selectedDay ? selectedDay.expense : 0);
    ordersData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
    profitData.unshift(!!selectedDay ? selectedDay.profit : 0);
  }

  const options = {
    chart: {
      zoomType: 'xy'
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
    yAxis: [{ // Primary yAxis
      title: {
        text: 'Amount ($)',
      },
      labels: {
        format: '{value} S',
      },
    },
      {
      title: {
        text: 'Orders Count',
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    tooltip1: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} {series.unit}</b></td></tr>',
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
      type: 'column',
      name: 'Revenue',
      color: '#0065FF',
      tooltip: {
        valueSuffix: ' $'
      },
      data: revenueData,
    }, {
      type: 'column',
      name: 'Cost',
      unit: '$',
      color: '#8270DB',
      tooltip: {
        valueSuffix: ' $'
      },
      data: costData,
    }, {
      type: 'spline',
      name: 'Order',
      color: '#D97008',
      data: ordersData,
    }, {
      type: 'column',
      name: 'Profit',
      tooltip: {
        valueSuffix: ' $'
      },
      color: '#22A06B',
      data: profitData,
    }]
  }
  return (
    <ChartWrapper options={options} />
  );
}
