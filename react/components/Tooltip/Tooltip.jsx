import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './Tooltip.scss';

class Tooltip extends Component {
  static propTypes = {
    sourceContent: PropTypes.node,
    tipContent: PropTypes.node,
    direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    toggleEvent: PropTypes.oneOf(['hover', 'click'])
  }

  static defaultProps = {
    direction: 'right',
    toggleEvent: 'click'
  }

  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };
  }

  componentDidUpdate = () => {
    const sourceNode = this.refs.source;
    const popupNode = this.refs.popup;
    const { direction } = this.props;
    if (this.state.isShow && sourceNode && popupNode) {
      this.setTipPopupPosition(sourceNode, popupNode, direction);
    }
  }

  onToggleTip = () => {
    return new Promise((resolve, reject) => {
      this.setState({ isShow: !this.state.isShow }, resolve);
    })
  }

  setTipPopupPosition = (sourceNode, popupNode, direction) => {
    let popupNodeTop, popupNodeLeft;
    switch (direction) {
      case 'top':
        popupNodeTop = sourceNode.offsetTop - popupNode.clientHeight;
        popupNodeLeft = sourceNode.offsetLeft + sourceNode.clientWidth / 2;
        break
      case 'left':
        popupNodeTop = sourceNode.offsetTop + sourceNode.clientHeight / 2;
        popupNodeLeft = sourceNode.offsetLeft - popupNode.clientWidth;
        break
      case 'bottom':
        popupNodeTop = sourceNode.offsetTop + sourceNode.clientHeight;
        popupNodeLeft = sourceNode.offsetLeft + sourceNode.clientWidth / 2;
        break
      default:
        popupNodeTop = sourceNode.offsetTop + sourceNode.clientHeight / 2;
        popupNodeLeft = sourceNode.offsetLeft + sourceNode.clientWidth;
    }

    popupNode.style.top = `${popupNodeTop}px`;
    popupNode.style.left = `${popupNodeLeft}px`;
  }

  renderSource = () => {
    const { sourceContent, toggleEvent } = this.props;
    const eventListeners = {};
    if ('click' === toggleEvent) {
      eventListeners.onClick = this.onToggleTip;
    } else if ('hover' === toggleEvent) {
      eventListeners.onMouseover = this.onToggleTip;
      eventListeners.onMouseout = this.onToggleTip;
    }

    return (
      <div ref="source" className="tt-source" { ...eventListeners }>{ sourceContent }</div>
    );
  }

  renderTip = () => {
    const { tipContent, direction } = this.props;

    return (
      <div
        ref="popup"
        className={ classNames('tt-popup', `tt-popup-${direction}`, {
          hidden: !this.state.isShow
        }) }
      >{ tipContent }</div>
    );
  }

  render = () => {
    return (
      <div className="tooltip-wrapper">
        { this.renderSource() }
        { this.renderTip() }
      </div>
    );
  }
}

export default Tooltip;
