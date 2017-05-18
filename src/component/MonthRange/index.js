import React from 'react';
import { Col, DatePicker } from 'antd';
const { MonthPicker } = DatePicker;
class MonthRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
    if (typeof this.props.cb === 'function') {
      this.props.cb({
        [field]: value
      });
    }
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Col push={1} span={10}>
        <MonthPicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM"
          value={startValue}
          placeholder="起始日期"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        ~
        <MonthPicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM"
          value={endValue}
          placeholder="截止日期"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </Col>
    )
  }
}

export default MonthRange;