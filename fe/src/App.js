
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";

import axios from 'axios';
import './App.css';


// Welcome screen before displaying the first question
const url = 'https://github.com/xanderstevenson/CLUS_Demo/blob/master/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0
// Set the slide heading
var headingWords = 'Cisco Formula Fun!'
// Set the button text
var buttonText = 'Begin!'

const App = () => {
	const [question,setImage] = useState(url)
	const [questionList,setQuestionList] = useState('')

	useEffect( () => {
		if( questionList === '' ) {
			axios.get('http://localhost:8000/questions')
			.then (response => {
				setQuestionList(response.data)
			})
			.catch(error => {
				console.error("Error fetching quetions from database")
			})
		}
	}, []);

	const imageHandler = (e) => {
		if (index < questionList.length) {
			// change button text variable to be plugged into buttonElement below
			buttonText = 'Next Question'
			setImage(questionList[index].filename)
			index = index + 1
			// change heading variable to be plugged into headingElement below
			headingWords = 'Question #' + index
		} else {
			alert('Congratulation, you have completed the challenge!')
		}
	}


    // produce header element with variable from above
    var headingElement = <p className="heading">{headingWords}</p>

	// produce button text with variable from above
	// button can be hid before starting the race
	var buttonElement = <button className="image-upload" onClick={imageHandler}>{buttonText}</button>

	var username = 'test_user'


	

	// 	<div className="page">
	// 		<div className="container">
	// 			{headingElement}
	// 			<div className="img-holder">
	// 				<img src={question} alt="" id="img" className="img" />
	// 			</div>
	// 			{buttonElement}
	// 			<br></br>
	// 			<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUS_Demo/blob/master/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>	
	// 		</div>
	// 	</div>
	// )



	function LandingPage() {
		return (
		  <div>
			<h1 class="titles">Landing Page!</h1>
			<Link to="/register">To Register!</Link>
		  </div>
		);
	  }

	  function RegisterPage() {
		return (
		  <div>
			<h1 class="titles">Register Page!</h1>
			{/* <Link to="/profile/:username">To the Holding Page!</Link> */}
			{/* hardcode username for testing */}
			<Link to="/profile/andrew">To the Holding Page!</Link>
		  </div>
		);
	  }

	  function HoldingPage() {
		return (
		  <div>
			<h1>Profile Page for {username}!</h1>
			<Link to="/question">To the Question Page!</Link>
		  </div>
		);
	  }


	function QuestionPage() {
		// url = 'https://pubhub.devnetcloud.com/media/clus19/site/images/devviebackpack-for-clus.png'
		return (
			
		  <div>
			  {buttonElement}
			  {/* <div className="img-holder">
				  <img src={question} alt="" id="img" className="img" />
			  </div> */}
		  </div>
	  );
	  }
	




	return (

		<div className="page">
			<div className="container">
				{headingElement}
				<div className="img-holder">
					<img src={question} alt="" id="img" className="img" />
				</div>
				<Router>
					<Routes>
						<Route exact path="/" element={<LandingPage />} />
						<Route exact path="/register" element={<RegisterPage />} />
						<Route path="/profile/:username" element={<HoldingPage />} />
						<Route path="/question" element={<QuestionPage />} />
					</Routes>
				</Router>
				<br></br>
        		<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUS_Demo/blob/master/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>	
			</div>
	  	</div>
	)









}



export default App;




