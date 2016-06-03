import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/VisibilityTypes';
import classnames from 'classnames';

const types = [SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE];

const TYPES_VIEW_NAME = {
  [SHOW_ALL]: 'All',
  [SHOW_COMPLETED]: 'Completed',
  [SHOW_ACTIVE]: 'Active'
}

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    activeCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    visibilityType: PropTypes.oneOf(types).isRequired,
    onChangeType: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired
  }

  changeHandler = (type) => {
    this.props.onChangeType(type);
  }

  renderCount = () => {
    let elem;
    if (this.props.activeCount) {
      elem = (
        <span className="todo-count">
          <b>{ this.props.activeCount } </b>
          <span>{ ' items' }</span>
          <span>{ ' left' }</span>
        </span>
      );
    } else {
      elem = (
        <span className="todo-count">
          <span>{ 'No' }</span>
          { ' ' }
          <span>{ ' item' }</span>
          { ' ' }
          <span>{ ' left' }</span>
        </span>
      );
    }

    return elem;
  }

  renderFilter = () => {
    return (
      <ul className="filters">
        {
          types.map((type) => {
            return (
              <li key={ type }>
                <a style={ { cursor: "pointer" } } className={ classnames({ selected: type === this.props.visibilityType }) }
                  onClick={ this.changeHandler.bind(this, type) }>
                  { TYPES_VIEW_NAME[type] }
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }

  renderClear = () => {
    if (this.props.completedCount) {
      return (
        <button className="clear-completed" onClick={ this.props.clearCompleted }>Clear Completed</button>
      );
    }
  }

  render = () => {
    return (
      <footer className="footer">
        { this.renderCount() }
        { this.renderFilter() }
        { this.renderClear() }
      </footer>
    );
  }
}

export default Footer;
