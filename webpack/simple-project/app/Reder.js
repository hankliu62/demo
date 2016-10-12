import React, { Component } from 'react';

import { getCurrentTime } from '../utils/DateUtil';

class Reder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: getCurrentTime()
    }
  }

  componentDidMount = () => {
    this.setStateTimeEverySecond();
  }

  setStateTimeEverySecond = () => {
    this.setState({ time: getCurrentTime() });
    return setTimeout(this.setStateTimeEverySecond, 1000);
  }

  render() {
    return <div>{ `${this.state.time}` }</div>;
  }
}

export default Reder;
