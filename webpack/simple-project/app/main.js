// (() => {
//   var greeter = require('./Greeter.js');
//   document.getElementById('root').appendChild(greeter());
// })();

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Greeter from './Greeter.jsx';

import '../css/main.css';

render(<Greeter />, document.getElementById('root'))
