
let imageDatas = require('../data/dataImages.json');
  
  imageDatas = (function genImageURL(dataArr){
    for(let i = 0 , j = dataArr.length ; i < j ; i+=1){
      let img = dataArr[i];
        img.URL = require('../images/' + img.fileName);

        dataArr[i] = img;
    }
    return dataArr;
  })(imageDatas);
//产生一个low 到 high 区间的随机数
function getRangeRandom(low, high){
    return Math.floor(Math.random() * (high - low) + low);
}


let Constant = {
    //图片
    imageDatas: imageDatas,
    //中心位置信息
      centerPos: {
        left : 0,
        right: 0
      },
      // 水平方向取值范围
      hPosRange: { 
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      // 垂直方向取值范围
      vPosRange: { 
            x: [0, 0],
            topY: [0, 0]
      },

      rearrange: function(centerIndex, arr){

          let imgsArrangeArr = arr,
            centerPos = this.centerPos,
            hPosRange = this.hPosRange,
            vPosRange = this.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x;


          let  imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), // 0 or 1
            topImgSpliceIndex = 0,
            //中心图片的状态
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            // 首先居中 centerIndex 的图片
            imgsArrangeCenterArr[0].pos = centerPos;

            // 取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
            //布局位于上侧的图片
           
            imgsArrangeTopArr.forEach(function(value, index){
                imgsArrangeTopArr[index].pos = {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            })
            //布局左右两侧的图片
            for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j ; i++ ){
                let hPosRangeLorX = null ;

                if( i < k ){
                   hPosRangeLorX = hPosRangeLeftSecX;
                }else{
                    hPosRangeLorX = hPosRangeRightSecX;
                }
                imgsArrangeArr[i].pos = {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLorX[0], hPosRangeLorX[1])
                }

            }
            // 把在上侧区域的图片放回原来数组
            if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }
            // 把中间的图片放回原来数组
            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
            //改变state
            
            	return imgsArrangeArr;
            }

  }


module.exports = Constant;