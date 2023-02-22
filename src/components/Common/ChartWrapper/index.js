import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function ChartWrapper({ options = []}) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}
