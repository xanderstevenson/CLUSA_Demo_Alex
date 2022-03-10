import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
      profileImg:'https://pubhub.devnetcloud.com/media/devnetcreate-challenge-2021/site/images/devvie-on-homepage.png'
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
	render() {
    const { profileImg} = this.state
		return (
			<div className="page">
				<div className="container">
					<h1 className="heading">CLUS Demo Question</h1>
					<div className="img-holder">
						<img src={profileImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
					<div className="label">
          <label className="image-upload" htmlFor="input">
						Select Photo
					</label>
          </div>
				</div>
			</div>
		);
	}
}

export default App;