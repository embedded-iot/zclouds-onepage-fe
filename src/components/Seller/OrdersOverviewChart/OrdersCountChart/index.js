import React from 'react';
import ChartWrapper from 'components/Common/ChartWrapper';
import { datetime } from 'utils';
import { DATE_FORMAT } from 'components/contants';

export default function OrdersCountChart({ data = [], fromDate = datetime.getPreviousDay(new Date(), 6), toDate = new Date()}) {
  let currentDay = toDate;
  const categories = [];
  const chartData = [];
  while (currentDay >= fromDate) {
    const dateStr = datetime.convert(currentDay, DATE_FORMAT);
    categories.unshift(dateStr);
    currentDay = datetime.getPreviousDay(currentDay);
    const selectedDay = data.find(item => item.convertedOrderDate === dateStr);
    chartData.unshift(!!selectedDay ? selectedDay.orderCount : 0);
  }

  const options = {
    chart: {
      type: 'area'
    },
    title: {
      text: '',
    },
    xAxis: {
      categories
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
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#0065FF',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#0065FF'
        }
      }
    },
    series: [{
      name: 'Orders count',
      data: chartData
    }]
  }
  return (
    <ChartWrapper options={options} />
  );
}
