import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react'; 
import './App.css';
import { Layout, Menu, Tabs } from 'antd';
import Bar from './component/Bar';
import Line from './component/Line';
import Radar from './component/Radar';
import Pop from './component/Pop';
import Plane from './component/Plane';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="同科室对比" key="1">
                <ReactEcharts 
                  option={Bar} 
                  style={{height: '480px', width: '80%'}}  
                  className='react_for_echarts' 
                />
              </TabPane>
              <TabPane tab="同时段对比" key="2">
                <ReactEcharts 
                  option={Pop} 
                  style={{height: '480px', width: '80%'}}  
                  className='react_for_echarts' 
                />
              </TabPane>
              <TabPane tab="骨科(同比)" key="3">
                <ReactEcharts 
                  option={Radar} 
                  style={{height: '480px', width: '80%'}}  
                  className='react_for_echarts' 
                />
              </TabPane>
              <TabPane tab="骨科耗占比" key="4">
                <ReactEcharts 
                  option={Line} 
                  style={{height: '480px', width: '80%'}}  
                  className='react_for_echarts' 
                />
              </TabPane>
              <TabPane tab="公司业务分布" key="5">
                <ReactEcharts 
                  option={Plane} 
                  style={{height: '480px', width: '100%'}}  
                  className='react_for_echarts' 
                />
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
