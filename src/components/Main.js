require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let Constant = require('./control.js');

class ImgFigure extends React.Component {
  render(){
    let styleObj = {};
    if(this.props.arrange){
        styleObj = this.props.arrange.pos;
    }
    return (
        <figure className="img-figure" style={styleObj}>
          <img src={this.props.data.URL} alt={this.props.data.title} />
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
      );
  }
}




class AppComponent extends React.Component {

    //初始化state
  constructor() {
        super();
        this.state = {
          imgsArrangeArr: []
        }
    }
    //舞台大小
  componentDidMount(){
        //这里用scrollWidth 和 scrollHeight
          //scrollWidth offsetWidth clientWidth区别
      
          //scrollWidth是对象实际内容的宽度，不包含滚动条等边界宽度。
          //会随着对象中内容超过可视区域后而变大
      
          //clientWidth可视区域宽度，不包含滚动条，会随对象显示大小的变化
      
          //offsetWidth是对象整体的实际宽度，包含滚动条等边线
          //会随会随对象显示大小的变化

    //拿到舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil( stageW / 2),
      halfStageH = Math.ceil( stageH / 2);
      
    //拿到imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
      
    //计算中心图片的位置点
    Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // 计算左侧 右侧区域图片排布位置的取值范围
    //左侧区域X
    Constant.hPosRange.leftSecX[0] = - halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    //右侧区域X
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = 0 - halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;
    let centerNum = Math.floor(Math.random() * (0 - Constant.imageDatas.length) + Constant.imageDatas.length)
    let arr = Constant.rearrange(centerNum, this.state.imgsArrangeArr);
    this.setState({
        imgsArrangeArr: arr
    })
  } 


  render() {
    
    let imgFigures = []; 
    Constant.imageDatas.forEach(function(value, index){
         if(!this.state.imgsArrangeArr[index]){
                  this.state.imgsArrangeArr[index] = {
                      pos: {
                        left: 0,
                        top: 0
                      }
                  }
              }
              imgFigures.push(
                  <ImgFigure 
                    key={index}
                    data={value}
                    ref={'imgFigure' + index}
                    arrange={this.state.imgsArrangeArr[index]} 
                  />
                )
    }.bind(this));
    
    

    return (
      <section className="stage" ref="stage">
      	  <section className="img-sec">
            {imgFigures}
      	  </section>
      	  <nav className="controller-nav">
      	  </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
