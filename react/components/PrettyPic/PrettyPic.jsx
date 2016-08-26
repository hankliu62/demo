import React, { Component, PropTypes } from 'react';

import Germany from './images/Germany.jpg';
import New_Zealand from './images/New_Zealand.jpg';
import Australian from './images/Australian.jpg';
import France from './images/France.jpg';
import Canada from './images/Canada.jpg';
import America from './images/America.jpg';
import './PrettyPic.scss';

class PrettyPic extends Component {
  constructor(props) {
    super(props);

    this.directionPosition = {
        left: {
            top: '0',
            left: '-100%'
        },
        right: {
            top: '0',
            left: '100%'
        },
        bottom: {
            top: '100%',
            left: '0'
        },
        top: {
            top: '-100%',
            left: '0'
        }
    };
  }

  onMouseEnterPic = (event, picRef, refName) => {
    const picNode = this.refs[picRef];
    const maskNode = this.refs[refName];

    if (picNode && maskNode) {
      const direction = this.getEnterOrLeaveDirection(event, picNode);
      maskNode.className = `mask`;
      maskNode.style.top = this.directionPosition[direction].top;
      maskNode.style.left = this.directionPosition[direction].left;
      //reflow
      maskNode.offsetWidth;
      maskNode.className += ' trans';
      maskNode.style.top = '0px';
      maskNode.style.left = '0px';
    }
  }

  onMouseLeavePic = (event, picRef, refName) => {
    const picNode = this.refs[picRef];
    const maskNode = this.refs[refName];

    if (picNode && maskNode) {
      const direction = this.getEnterOrLeaveDirection(event, picNode);
      maskNode.style.top = this.directionPosition[direction].top;
      maskNode.style.left = this.directionPosition[direction].left;
    }
  }

  getEnterOrLeaveDirection = (event, target) => {
    const directions = ['top', 'right', 'bottom', 'left'];
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const x = (event.pageX - target.offsetLeft - (width / 2)) * (width > height ? (height / width) : 1);
    const y = (event.pageY - target.offsetTop - (height / 2)) * (height > width ? (width / height) : 1);
    const index = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    return directions[index];
  }

  render() {
    const pictures = [
      {
        filepath: Germany,
        title: '德国',
        desc: '剛毅又不乏浪漫的國度 自驾可领略别样的风光',
        detailUrl: '#'
      },
      {
        filepath: New_Zealand,
        title: '新西兰',
        desc: '梦幻中的中土世界 世界最后一片净土',
        detailUrl: '#'
      },
      {
        filepath: Australian,
        title: '澳大利亚',
        desc: '大洋中的一个世外桃源 只有蓝天，没有白云',
        detailUrl: '#'
      },
      {
        filepath: France,
        title: '法国',
        desc: '巴黎的大气浪漫 南法的闲散慵懒 每个角落都会给你惊喜',
        detailUrl: '#'
      },
      {
        filepath: Canada,
        title: '加拿大',
        desc: '枫叶之国，自西向东 一步一景，让人流连忘返的国度',
        detailUrl: '#'
      },
      {
        filepath: America,
        title: '美国',
        desc: '车轮上的国家 只有在车轮上才会不枉此行',
        detailUrl: '#'
      }
    ];

    return (
      <div className="pretty-pic-wrapper">
        <div className="pretty-pic">
          <ul className="pretty-pic-list clearfix">
            {
              pictures.map((pic, index) => {
                const picRef = `picItem${index}`;
                const maskRef = `picMask${index}`;
                return (
                  <li
                    ref={ picRef }
                    key={ index }
                    className={ `pretty-pic-item pic-item-${index + 1}` }
                    onMouseEnter={ (e) => this.onMouseEnterPic(e, picRef, maskRef) }
                    onMouseLeave={ (e) => this.onMouseLeavePic(e, picRef, maskRef) }
                  >
                    <img src={ pic.filepath } />
                    <div className="mask" ref={ maskRef }>
                      <div className="mask-content">
                        <h5 className="mask-title">{ pic.title }</h5>
                        <div className="mask-descs">{ pic.desc.split(' ') }</div>
                        <a className="mask-detail" href={ pic.detailUrl }>{ `查看${ pic.title }自驾攻略 >>` }</a>
                      </div>
                    </div>
                    <h5 className="pretty-pic-title">{ pic.title }</h5>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default PrettyPic;
