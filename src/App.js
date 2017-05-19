import React, { Component } from 'react';
import './App.css';
import ReactEcharts from 'echarts-for-react';
import { Layout, Menu, Row, Col, DatePicker, Button, Tabs, Select, Icon, Modal, InputNumber } from 'antd';
import AutoCompleteSelect from './component/AutoCompleteSelect';
import MonthRange from './component/MonthRange';
import { Single, Multiple} from './containers/charts';
import Chart from './component/Chart';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option;


class App extends Component {
  state = {
    monthDepts: [],
    monthDate: {
      startValue: '',
      endValue: ''
    },
    monthSearch: {},
    yearDepts: [],
    years: [],
    hospitalDepts: [],
    hospitalDate: {
      startvalue: '',
      endValue: ''
    },
    yearBase: 20,
    monthBase: 20
  }
  /**生成报表 */
  report = (type) => {
    let postData = {};
    if (type === 'monthBase') {
      postData = {
        depts: this.state.monthDepts,
        start: this.state.monthDate.startValue,
        end: this.state.monthDate.endValue
      }
    } else {
      postData = {
        depts: this.state.yearDepts,
        years: this.state.years
      }
    }
    fetch('/storm/material/consumableDivisionReport', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
      const len = data.series[0].data.length;
      let dataArr = [];
      for (let i=0;i<len;i++) {
        dataArr.push(this.state[type])
      }
      const baseLine = {
        name:'基准线',
        type:'line',
        stack: '基准线',
        data: dataArr
      }
      if (data.series[data.series.length-1].stack === '基准线') {
        data.series[data.series.length-1] = baseLine;
      } else {
        data.series[data.series.length] = baseLine;
      }
      Modal.info({
        title: '统计报表',
        width: 1000,
        style: {top: 20 },
        content: 
          <Chart 
            title={data.title} 
            legend={data.legend} 
            xAxis={data.xAxis} 
            yAxis={data.yAxis} 
            serise={data.series}
          />
      });
    })
  }
  //P1 查询
  monthSearch = () => {
    const depts = this.state.monthDepts;
    const { startValue, endValue} = this.state.monthDate;
    const postData = {
      depts: this.state.monthDepts,
      start: startValue,
      end: endValue
    }
    this.setState({
      monthSearch: postData
    })
    this.refs.single.onSearch(postData);
    console.log('查询条件: ' + '[科室ID]--' + depts, '开始时间:' + startValue, '结束时间:' + endValue);
  }
  //P2 查询
  yearSearch = () => {
    const postData = {
      depts: this.state.yearDepts,
      years: this.state.years
    }
    this.refs.multiple.onSearch(postData);
    console.log('查询条件: ' + '[科室ID]--' + this.state.yearDepts, '年份: ' + this.state.years);
  }
  //P3 查询
  hospitalSearch = () => {

  }
  //查询
  onSearch = (index) => {
    switch (index) {
      case 1:
          this.monthSearch();
        break;
      case 2:
          this.yearSearch();
        break;
      case 3:
          this.hospitalSearch();
        break;  
      default:
        break;
    }
  }
  //月份科室
  monthPercent = (data) => {
    this.setState({
      monthDepts: data
    })
  }
  //年份科室
  yearPercent = (data) =>{
    this.setState({
      yearDepts: data
    })
  }
  //院区
  //年份
  yearRange = (date) => {
    this.setState({
      years: date
    })
  }
  //月份日期
  monthRange = (date) => {
    const d = this.state.monthDate;
    let newState = {};
    for (let key in date) {
      newState = Object.assign({}, d, {[key]: moment(date[key]).format('YYYY-MM')});
    }
    this.setState({monthDate: newState});
  }
  baseChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  render() {
    return (
      <Layout>
        <Header className={'charts-bg-color charts-header'}>
          <div className={'logo'}></div>
        </Header>
        <Layout className={'charts-bg-color charts-body'}>
          <Sider className={'charts-bg-color'}>
            <Menu
              style={{height: 600}}
              onClick={this.handleClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              mode="inline"
            >
              <Menu.Item key="1">科室耗占比</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{padding: 16, height: 600}}>
            <Tabs>
              <TabPane tab="科室-月度耗占比" key="2">
                <Row>
                  <Col span={6}>
                    <AutoCompleteSelect 
                      style={{width: 250}}
                      placeholder={'请输入科室名称'}
                      query={['deptName']}
                      ref='fetchs' 
                      url={`/storm/material/searchMaterialList`} 
                      cb={this.monthPercent}
                    />
                  </Col>
                  <MonthRange cb={this.monthRange}/>
                  <Col span={4}>
                    基准值:
                    <InputNumber 
                      min={1} 
                      max={100} 
                      defaultValue={20} 
                      onChange={this.baseChange.bind(this, 'monthBase')}/>
                  </Col>
                  <Col push={1}>
                    <Button type="primary" onClick={this.onSearch.bind(this, 1)}>查询</Button>
                    <Button type="primary" ghost style={{marginLeft: 10}} onClick={this.report.bind(this, 'monthBase')}>
                      <Icon type="area-chart" />
                      报表
                    </Button>
                  </Col>
                </Row>
                <Single ref='single'/>
              </TabPane>
              <TabPane tab="科室-年度耗占比" key="3">
                <Row>
                  <Col span={6}>
                    <AutoCompleteSelect 
                      style={{width: 250}}
                      placeholder={'请输入科室名称'}
                      query={['deptName']}
                      ref='fetchs' 
                      url={`/storm/material/findDivisionYearZB`} 
                      cb={this.yearPercent}
                    />
                  </Col>
                  <Col push={1} span={10}>
                   <Select
                      mode="multiple"
                      style={{ width: 350 }}
                      placeholder="请输入年份"
                      onChange={this.yearRange}
                    >
                      <Option key={2010}>2010</Option>
                      <Option key={2011}>2011</Option>
                      <Option key={2012}>2012</Option>
                      <Option key={2013}>2013</Option>
                      <Option key={2014}>2014</Option>
                      <Option key={2015}>2015</Option>
                      <Option key={2016}>2016</Option>
                      <Option key={2017}>2017</Option>
                      <Option key={2018}>2018</Option>
                    </Select>
                  </Col>  
                  <Col span={4}>
                    基准值:
                    <InputNumber 
                      min={1} 
                      max={100} 
                      defaultValue={20}
                      onChange={this.baseChange.bind(this, 'yearBase')}/>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={this.onSearch.bind(this, 2)}>查询</Button>
                    <Button type="primary" ghost style={{marginLeft: 10}}>
                    <Icon type="area-chart" />
                    报表
                    </Button>
                  </Col>
                </Row>
                <Multiple ref='multiple'/>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
        <Footer style={{textAlign: 'center'}}>
          版权所有️©普华信联科技有限公司   
        </Footer>
      </Layout>
    );
  }
}

export default App;

              // <TabPane tab="院区-月度耗占比" key="4">
              //   <Row>
              //     <Col span={8}>
              //       <AutoCompleteSelect 
              //         style={{width: 350}}
              //         placeholder={'请输入院区名称'}
              //         ref='fetchs' 
              //         url={``} 
              //         cb={this.monthPercent}
              //       />
              //     </Col>
              //     <MonthRange/>
              //     <Col push={1}>
              //       <Button type="primary">查询</Button>
              //       <Button type="primary" ghost style={{marginLeft: 10}}>
              //         <Icon type="area-chart" />
              //         报表
              //       </Button>
              //     </Col>
              //   </Row>
              //   <Hospital/>
              // </TabPane>

       