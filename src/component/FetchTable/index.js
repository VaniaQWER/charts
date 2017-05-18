import React from 'react';
import { Table,message } from 'antd';
import querystring from 'querystring';
import reqwest from 'reqwest';

class FetchTable extends React.Component {
  state = {
    data: [],
    pagination: {

    },
    loading: false,
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination;
    const querys = this.props.query;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sidx: sorter.field,
      sord: sorter.order,
      ...querys,
      ...filters,
    });
   }
  fetch = (params = {...this.props.query}) => {
    this.setState({ loading: true });
    fetch(this.props.url,{
      method: 'post',
      //mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pagesize: this.props.pageSize || 15,
        ...params,
      })
      // body: querystring.stringify({
      //   pagesize: this.props.pageSize || 15,
      //   ...params,
      // })
    }).then(res => res.json())
      .then((data) => {
      if(!data.status){
        message.error(data.msg);
      }
      let pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.result.records;
      pagination.pageSize = this.props.pageSize || 15;
      if(!params.page) {
        pagination.current = 1;
      }
      if (typeof this.props.cb === 'function') {
        this.props.cb(data.result.rows)
      }
      this.setState({
        loading: false,
        data: data.result.rows,
        pagination,
      });
    }).catch(err => {
      this.setState({
        loading: false
      });
      //message.error(err);
    })
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table 
        columns={this.props.columns}
        size={this.props.size || 'small'}
        style={{marginTop: '10px'}}
        rowKey={this.props.rowKey}
        dataSource={this.state.data}
        pagination={typeof this.props.isPagination === 'undefined' ? this.state.pagination : this.props.isPagination}
        loading={this.props.loading || this.state.loading}
        onChange={this.handleTableChange}
        rowClassName={this.props.rowClassName}
        rowSelection={this.props.rowSelection || null}
      />
    );
  }
}

// FetchTable.propTypes = {
//   columns: React.PropTypes.array.isRequired,
//   rowKey: React.PropTypes.string.isRequired,
//   url: React.PropTypes.string.isRequired
// }

export default FetchTable;
