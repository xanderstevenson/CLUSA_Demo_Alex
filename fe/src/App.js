
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";

import axios from 'axios';
import './App.css';
// import { Register } from "./components/RegisterPage";

// Welcome screen before displaying the first question
var url = 'https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0
// Set the slide heading
var headingWords = 'Cisco Formula Fun!'
// Set the button text
var buttonText = 'Begin!'

const App = () => {
	var [question,setImage] = useState(url)
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
	var buttonElement = <button className="mainButton" onClick={imageHandler}>{buttonText}</button>

	var username = 'test_user'
	var carNumber = 3

// 4 functions to display four different pages
	
	function LandingPage() {
		return (
		  	<div>
				<button className="mainButton"><Link to="/register">Let's Register</Link></button>
				<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>
			</div>
		);
	  }

	  function RegisterPage() {
		  url="https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/cars-palmtrees.jpg?raw=true"
		  setImage(url)
		return (
			
			<center>
			<form name="f">

			  <label>First Name: </label><input type="text" id="fname" ></input>
			  <br></br>
			  <label>Last Name: </label><input type="text" id="lname" ></input>
			  <br></br>
			  <label>Email Addr: </label><input type="text" id="emailId"  onkeyup="emailValidate()" ></input>
			  <br></br>
			  <button type="submit" className="mainButton"><Link to="/holding-page">Register</Link></button>
			</form>
			</center>
		);
	  }

	  function HoldingPage() {
		url="https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/lambo_speedometer.gif?raw=true"
		setImage(url)
		return (
		<center>
		  <div>
			<h1>Welcome, {username}!</h1>
			<h1>You have been assigned Car #{carNumber}</h1>
			<button className="mainButton"><Link to="/start">Start!</Link></button>
		  </div>
		  </center>
		);
	  }


	function QuestionPage() {
		// url = 'https://pubhub.devnetcloud.com/media/clus19/site/images/devviebackpack-for-clus.png'
		return (
			
		  <div>
			<center>
			  {buttonElement}
			</center>
		  </div>
	  );
	  }
	
// main biolerplate HTML for all pages

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
						<Route path="/holding-page" element={<HoldingPage />} />
						<Route path="/start" element={<QuestionPage />} />
					</Routes>
				</Router>
			</div>
	  	</div>
	)


}



export default App;




