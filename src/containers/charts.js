import React from 'react';
import { Row, Table} from 'antd';
import FetchTable from '../component/FetchTable';

const columns = [{
  title: '科室',
  dataIndex: 'DEPT_NAME',
}, {
  title: '时间',
  dataIndex: 'NY',
}, {
  title: '全部收入',
  dataIndex: 'QB',
}, {
  title: '普耗收入',
  dataIndex: 'WZ_JE',
}, {
  title: '耗占比',
  dataIndex: 'ZB',
}];

export class Single extends React.Component {
  onSearch = (query) => {
    this.refs.table.fetch(query);
  }
  render() {
    return (
      <Row style={{marginTop: 10}}>
        <FetchTable 
            query={this.props.query || null}
            ref='table'
            columns={columns}
            url={'/storm/material/consumableDivision'}
            />
      </Row>
    )
  }
}

export class Multiple extends React.Component {
  onSearch = (query) => {
    console.log(query);
    this.refs.table.fetch(query);
  }
  render() {
    return (
      <Row style={{marginTop: 10}}>
        <FetchTable 
          query={this.props.query || null}
          ref='table'
          columns={columns}
          url={'/storm/material/findDivisionYearZB'}
        />
      </Row>
    )
  }
}

export class Hospital extends React.Component {
  render() {
    return (
      <Row style={{marginTop: 10}}>
        <Table columns={columns} size="small" />
      </Row>
    )
  }
}
            // <FetchTable 
            //   ref='table'
            //   cb={(data) => this.checkHandle(data)}
            //   isPagination={false}
            //   query={this.state.query}
            //   columns={columns}
            //   url={mail.ORG_USER}
            //   rowKey='userId'
            //   rowSelection={{
            //     selectedRowKeys: this.state.selected,
            //     onChange: (selectedRowKeys, selectedRows) => {
            //       this.setState({
            //         selected: selectedRowKeys
            //       })
            //     }
            //   }}
            // />