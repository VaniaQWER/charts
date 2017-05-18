import React from 'react';
import { Select} from 'antd';
import querystring from 'querystring';
import jsonp from 'fetch-jsonp';
const Option = Select.Option;

let timeout;
let currentValue;

function fake(value, callback, url, query) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  fetch(url, {
    //mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: 'deptName=' + value
    body: JSON.stringify({
      deptName: value
    })
  })
  .then(res => res.json())
  .then(d => {
    if (currentValue === value) {
      const result = d.rows;
      const data = [];
      result.forEach((r) => {
        data.push({
          value: r.id,
          text: r.text
        })
      })
      callback(data);
    }
  })
}




class MultipleSelect extends React.Component {
  state = {
    data: [],
    value: '',
    chosen: []
  }
  onSelect = (value) => {
    const chosen = [...this.state.chosen, value];
    this.setState({
      chosen: chosen
    })
  }
  onDeselect = (value) => {
    const index = this.state.chosen.findIndex((v, i, a) => v === value);
    let arr = this.state.chosen;
    arr.splice(index, 1);
    // console.log(index)
    //const arr = this.state.chosen.splice(index, 1);
    // console.log(arr.splice(index, 0))
    this.setState({
      chosen: arr
    })
  }
  getValues = (value) => {
    this.props.cb(value);
  }
  handleChange = (value) => {
    this.setState({ value });
    fake(value, data => this.setState({ data }), this.props.url, this.props.query);
  }
  render() {
    const options = this.state.data.map(d => <Option value={d.value} key={d.value}>{d.text}</Option>);
    return (
      <Select
        mode='multiple'
        value={this.state.chosen}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        showSearch
        defaultValue={this.props.defaultValue}
        onSearch={this.handleChange}
        onChange={this.getValues}
        notFoundContent="暂无查询结果"
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      >
        {options}
      </Select>
    );
  }
}

export default MultipleSelect;