// var config = require('../config/greeter.json');

// module.exports = () => {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// }

import React, { Component } from 'react';
import config from '../config/greeter.json';
import Reder from './Reder';

import style from '../css/Greeter.css';

class Greeter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <div className={ style['greeter-continer'] }>
        <h1>{ config.greetText }</h1>
        <div>{ config.greetDesc }</div>
        <Reder />
      </div>
    );
  }
}

export default Greeter;
