import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { Animate } from './Animate';
import { easeOutCubic, easeInOutCubic, getElementStyle } from './Utils';
import {
  DEFAULT_ANIMATE_DURATION,
  MIN_VELOCITY_TO_KEEP_DECELERATING,
  MIN_VELOCITY_TO_START_DECELERATION,
  DECELERATION_VELOCITY_RATE,
  POSITION_MAX_LENGTH,
  MINIUM_TRACKING_FOR_SCROLL,
  MINIUM_TRACKING_FOR_DRAG,
  TIME_FRAME
} from './Constants';

import './Picker.scss';

class Picker extends Component {
  static propTypes = {
    items: PropTypes.array,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    contentField: PropTypes.string,
    value: PropTypes.any,
    customClass: PropTypes.string,
    onChange: PropTypes.func,
    i18n: PropTypes.func.isRequired
  }

  static defaultProps = {
    items: [],
    textField: 'text',
    valueField: 'value',
    customClass: '',
    onChange: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.getSelectedItemIndex(props)
    };
  }

  componentDidMount = () => {
    this.init();
    const { picker } = this.refs;
    if (picker) {
      picker.addEventListener('touchstart', this.onTouchStart, false);
      picker.addEventListener('touchmove', this.onTouchMove, false);
      picker.addEventListener('touchend', this.onTouchEnd, false);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.props.value) {
      this.setState({ selectedIndex: this.getSelectedItemIndex(nextProps) });
    }
  }

  componentDidUpdate = (prevProps) => {
    const { items } = this.props;
    const { selectedIndex } = this.state;

    if (prevProps.items === items) {
      this.init();
    } else {
      this.select(selectedIndex, false);
    }
  }

  componentWillUnmount = () => {
    const { picker } = this.refs;
    if (picker) {
      picker.removeEventListener('touchstart', this.onTouchStart, false);
      picker.removeEventListener('touchmove', this.onTouchMove, false);
      picker.removeEventListener('touchend', this.onTouchEnd, false);
    }

    this.clearAnimate();
  }

  onTouchStart = (event) => {
    event.preventDefault();

    const timeStamp = +event.timeStamp;
    const touches = event.touches;
    this.clearAnimate();
    this.initialTouchTop = this.lastTouchTop = touches[0].pageY;
    this.lastTouchMove = timeStamp;
    this.enableScrollY = false;
    this.isTracking = true;
    this.didDecelerationComplete = false;
    this.isDragging = false;
    this.positions = [];
  }

  onTouchMove = (event) => {
    // Ignore event when tracking is not enabled (event might be outside of element)
    if (!this.isTracking) {
      return;
    }
    const timeStamp = +event.timeStamp;
    const touches = event.touches;

    const currentTouchTop = touches[0].pageY;
    const positions = this.positions;

    // Are we already is dragging mode?
    if (this.isDragging) {
      const moveY = currentTouchTop - this.lastTouchTop;
      let scrollTop = this.scrollTop;

      if (this.enableScrollY) {
        scrollTop -= moveY;

        const minScrollTop = this.minScrollTop;
        const maxScrollTop = this.maxScrollTop;

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          // Slow down on the edges
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop;
          } else {
            scrollTop = minScrollTop;
          }
        }
      }

      // Keep list from growing infinitely (holding min 10, max 20 measure points)
      if (positions.length > POSITION_MAX_LENGTH) {
        positions.splice(0, POSITION_MAX_LENGTH / 2);
      }

      // Track scroll movement for deceleration
      positions.push(scrollTop, timeStamp);

      // Sync scroll position
      this.publish(scrollTop);
      // Otherwise figure out whether we are switching into dragging mode now.
    } else {
      const distanceY = Math.abs(currentTouchTop - this.initialTouchTop);

      this.enableScrollY = distanceY >= MINIUM_TRACKING_FOR_SCROLL;
      positions.push(this.scrollTop, timeStamp);
      this.isDragging = this.enableScrollY && (distanceY >= MINIUM_TRACKING_FOR_DRAG);
    }

    // Update last touch positions and time stamp for next event
    this.lastTouchTop = currentTouchTop;
    this.lastTouchMove = timeStamp;
  }

  onTouchEnd = (event) => {
    // Ignore event when tracking is not enabled (no touchstart event on element)
    // This is required as this listener ('touchmove')
    // sits on the document and not on the element itself.
    if (!this.isTracking) {
      return;
    }

    const timeStamp = event.timeStamp;

    // Not touching anymore (when two finger hit the screen there are two touch end events)
    this.isTracking = false;

    // Be sure to reset the dragging flag now. Here we also detect whether
    // the finger has moved fast enough to switch into a deceleration animation.
    if (this.isDragging) {
      // Reset dragging flag
      this.isDragging = false;

      // Start deceleration
      // Verify that the last move detected was in some relevant time frame
      if ((timeStamp - this.lastTouchMove) <= TIME_FRAME) {
        // Then figure out what the scroll position was about 100ms ago
        const positions = this.positions;
        const endPos = positions.length - 1;
        let startPos = endPos;

        // Move pointer to position measured 100ms ago
        for (let i = endPos; i > 0 && positions[i] > (this.lastTouchMove - TIME_FRAME); i -= 2) {
          startPos = i;
        }

        // If start and stop position is identical in a 100ms timeframe,
        // we cannot compute any useful deceleration.
        if (startPos !== endPos) {
          // Compute relative movement between these two points
          const timeOffset = positions[endPos] - positions[startPos];
          const movedTop = this.scrollTop - positions[startPos - 1];

          // Based on 50ms compute the movement to apply for each render step
          this.decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

          // Verify that we have enough velocity to start deceleration
          if (Math.abs(this.decelerationVelocityY) > MIN_VELOCITY_TO_START_DECELERATION) {
            this.startDeceleration(timeStamp);
          }
        }
      }
    }

    if (!this.isDecelerating) {
      this.scrollTo(this.scrollTop);
    }

    // Fully cleanup list
    this.positions.length = 0;
  }

  setDimensions = (clientHeight, contentHeight) => {
    const { items } = this.props;

    this.clientHeight = clientHeight;
    this.contentHeight = contentHeight;

    const totalItemsCount = items.length;
    // 可见的items个数
    const clientItemsCount = Math.round(this.clientHeight / this.itemHeight);

    this.minScrollTop = -this.itemHeight * (clientItemsCount / 2);
    this.maxScrollTop = this.minScrollTop + totalItemsCount * this.itemHeight - 0.1;
  }

  setTranslateY = (element, translateValue) => {
    if (element) {
      const translateStyle = `translate3d(0, ${-translateValue}px, 0)`;
      element.style.transform = translateStyle;
      element.style['-webkit-transform'] = translateStyle;
    }
  }

  getTranslateY = (element) => {
    if (element) {
      const transZRegex = /\.*translate3d\(.*,(.*)px,.*\)/i;
      const matchData = transZRegex.exec(element.style.transform);
      return Number(matchData && matchData[1]) || 0;
    }

    return 0;
  }

  getSelectedItemIndex = (props) => {
    const { items, valueField, value } = props;
    let selectedIndex = 0;
    for (let i = 0, len = items.length; i < len; i++) {
      if (value === items[i][valueField]) {
        selectedIndex = i;
        break;
      }
    }
    return selectedIndex;
  }

  init = () => {
    this.defaultProperties = {
      isTracking: false, // 判断touch是否在本元素上出发的
      didDecelerationComplete: false, // 判断减速是否完成
      isDragging: false, // 判断是否手是否还在屏幕上移动(touche)
      isDecelerating: false,
      isAnimating: false, // 判断元素是否正在滚动
      clientHeight: 0, // Component的高度
      contentHeight: 0, // Component中List元素的总高度
      itemHeight: 0, // Component中List每个子元素的高度
      scrollTop: 0, // 元素的scrollTop
      minScrollTop: 0, // 元素最小可滚动的高度
      maxScrollTop: 0, // 元素最大可滚动的高度
      scheduleTop: 0,
      lastTouchTop: 0, // 最后滚动的高度
      lastTouchMove: 0, // 最后滚动的时间戳
      positions: [], // 坐标系
      minDeceletationScrollTop: 0, // 减速时，最小可滚动高度
      maxDeceletationScrollTop: 0, // 减速时，最大可滚动高度
      decelerationVelocityY: 0 // Y轴上减速的速度
    };

    Object.assign(this, this.defaultProperties);

    const { indicator, picker, content } = this.refs;

    this.itemHeight = parseInt(getElementStyle(indicator, 'height') || 0, 10);
    // 设置clientHeight， contentHeight，和根据上述两个值计算minScrollTop， maxScrollTop
    this.setDimensions(picker.clientHeight, content.offsetHeight);

    this.select(this.state.selectedIndex, false);
  }

  select = (selectedIndex, animate) => {
    const { items } = this.props;
    if (selectedIndex < 0 || selectedIndex >= items.length) {
      return;
    }

    this.scrollTop = this.minScrollTop + selectedIndex * this.itemHeight;
    this.scrollTo(this.scrollTop, animate);
  }

  scrollTo = (top, animate) => {
    animate = (animate === undefined) ? true : animate;
    this.clearAnimate();

    top = Math.round(top / this.itemHeight) * this.itemHeight;
    top = Math.max(Math.min(this.maxScrollTop, top), this.minScrollTop);

    if (top === this.scrollTop || !animate) {
      this.publish(top);
      this.scrollingComplete();
      return;
    }

    this.publish(top, DEFAULT_ANIMATE_DURATION);
  }

  // 通过scrollTop、minScrollTop和itemHeight 计算出滚动完后选中的item的index
  scrollingComplete = () => {
    const { items } = this.props;
    const selectedIndex = Math.round((this.scrollTop - this.minScrollTop - this.itemHeight / 2) / this.itemHeight);
    const selectedItem = items[selectedIndex];
    if (selectedItem && selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex });
      this.props.onChange(selectedItem, selectedIndex);
    }
  }

  clearAnimate = () => {
    if (this.isDecelerating) {
      Animate.stop(this.isDecelerating);
      this.isDecelerating = false;
    }

    if (this.isAnimating) {
      Animate.stop(this.isAnimating);
      this.isAnimating = false;
    }
  }

  // 动画滚动到content的指定位置
  publish = (top, animationDuration) => {
    // Remember whether we had an animation,
    // then we try to continue based on the current "drive" of the animation
    const wasAnimating = this.isAnimating;

    if (wasAnimating) {
      Animate.stop(wasAnimating);
      this.isAnimating = false;
    }

    const { content } = this.refs;
    // Keep scheduled positions for scrollBy functionality
    this.scheduledTop = top;

    if (animationDuration) {
      const oldTop = this.scrollTop;
      const diffTop = top - oldTop;

      const step = (percent) => {
        this.scrollTop = oldTop + (diffTop * percent);
        // Push values out
        this.setTranslateY(content, this.scrollTop);
      };

      const verify = (id) => {
        return this.isAnimating === id;
      };

      const completed = (renderedFramesPerSecond, animationId, wasFinished) => {
        if (animationId === this.isAnimating) {
          this.isAnimating = false;
        }

        if (this.didDecelerationComplete || wasFinished) {
          this.scrollingComplete();
        }
      };

      // When continuing based on previous animation
      // we choose an ease-out animation instead of ease-in-out
      const animateTimingFunction = wasAnimating ? easeOutCubic : easeInOutCubic;
      this.isAnimating = Animate.start(step, verify, completed, animationDuration, animateTimingFunction);
    } else {
      this.scrollTop = top;
      // Push values out
      this.setTranslateY(content, top);
    }
  }

  // Called when a touch sequence end and the speed of
  // the finger was high enough to switch into deceleration mode.
  startDeceleration = () => {
    this.minDeceletationScrollTop = this.minScrollTop;
    this.maxDeceletationScrollTop = this.maxScrollTop;

    // wrap class method
    const step = (percent, now, render) => {
      this.stepThroughDeceleration(render);
    };

    // Detect whether it's still worth to continue animating steps
    // If we are already slow enough to not being user perceivable anymore,
    // we stop the whole process here.
    const verify = () => {
      const shouldContinue = Math.abs(this.decelerationVelocityY) > MIN_VELOCITY_TO_KEEP_DECELERATING;
      if (!shouldContinue) {
        this.didDecelerationComplete = true;
      }
      return shouldContinue;
    };

    const completed = () => {
      this.isDecelerating = false;
      if (this.scrollTop <= this.minScrollTop || this.scrollTop >= this.maxScrollTop) {
        this.scrollTo(this.scrollTop);
        return;
      }

      if (this.didDecelerationComplete) {
        this.scrollingComplete();
      }
    };

    this.isDecelerating = Animate.start(step, verify, completed);
  }

  // Called on every step of the animation
  stepThroughDeceleration = () => {
    let scrollTop = this.scrollTop + this.decelerationVelocityY;

    const scrollTopFixed = Math.max(Math.min(this.maxDeceletationScrollTop, scrollTop),
      this.minDeceletationScrollTop);

    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed;
      this.decelerationVelocityY = 0;
    }

    if (Math.abs(this.decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % this.itemHeight) < 1) {
        this.decelerationVelocityY = 0;
      }
    } else {
      this.decelerationVelocityY *= DECELERATION_VELOCITY_RATE;
    }

    this.publish(scrollTop);
  }

  render = () => {
    const { items, textField, valueField, customClass } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div ref="picker" className={ `sb-picker ${customClass}` }>
        <div className="sb-picker-mask" ref="mask" />
        <div className="sb-picker-indicator" ref="indicator" />
        <div
          className="sb-picker-content"
          ref="content"
          onTouchStart={ this.onTouchStart }
          onTouchMove={ this.onTouchMove }
          onTouchEnd={ this.onTouchEnd }
        >
          {
            items.map((item, index) =>
            <div
              className={ classNames('sb-picker-item', {
                'sb-picker-item-selected': selectedIndex === index
              }) }
              key={ `${item[valueField] + index}` }
              dataIndex={ index }
            >
              <span className="sb-number text-center">{ item[textField] }</span>
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default Picker;
