import React from 'react';
import ReactEcharts from 'echarts-for-react'; 
import querystring from 'querystring';


class Chart extends React.Component {
  render() {
    return (
      <ReactEcharts 
        option={{
          title: {
            text: this.props.title
          },
          legend: {
            data: this.props.legend
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.props.xAxis
          },
          yAxis: {
            data: this.props.yAxis
          },
          serise: this.props.serise
        }} 
        style={{height: '480px', width: '99%'}}  
        className='react_for_echarts' 
      />
    )
  }
}

export default Chart;