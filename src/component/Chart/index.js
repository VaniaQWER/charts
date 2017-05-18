import React from 'react';
import ReactEcharts from 'echarts-for-react'; 
import querystring from 'querystring';


class Chart extends React.Component {
  state = {
    title: null,
    legend: null,
    xAxis: null,
    yAxis: null,
    series: []
  }
  fetchData = () => {
    fetch(`${this.props.url}/sug?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          //callback(data);
        }
      });
  }
  componentDidMount = () => {
    this.fetchData();
  }
  render() {
    return (
      <ReactEcharts 
        option={{
          title: {
            text: this.state.title
          },
          legend: {
            data: this.state.legend
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
            data: this.state.xAxis
          },
          yAxis: {
            data: this.state.yAxis
          },
          serise: this.state.serise
        }} 
        style={{height: '480px', width: '99%'}}  
        className='react_for_echarts' 
      />
    )
  }
}

export default Chart;