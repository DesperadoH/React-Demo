require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
var imageDatas = require('../data/dataImages.json');
	imageDatas = (function genImageURL(dataArr){
		for(let i = 0 , j = dataArr.length ; i < j ; i+=1){
			var img = dataArr[i];
				img.URL = require('../images/' + img.fileName);

				dataArr[i] = img;
		}
		return dataArr;
	})(imageDatas);
class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	  <section className="img-sec">
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
