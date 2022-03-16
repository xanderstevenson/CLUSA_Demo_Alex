
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
	var buttonElement = <button className="image-upload" onClick={imageHandler}>{buttonText}</button>

	var username = 'test_user'

// 4 functions to display four different pages
	
	function LandingPage() {
		return (
		  	<div>
				<button className="mainButton"><Link to="/register">Register</Link></button>
				<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>
			</div>
		);
	  }

	  function RegisterPage() {
		  url="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
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
			  <button type="submit" className="mainButton"><Link to="/profile/:username">Register</Link></button>
			</form>
			</center>
		);
	  }

	  function HoldingPage() {
		return (
		  <div>
			<h1>Profile Page for {username}!</h1>
			<Link to="/start">To the Question Page!</Link>
		  </div>
		);
	  }


	function QuestionPage() {
		// url = 'https://pubhub.devnetcloud.com/media/clus19/site/images/devviebackpack-for-clus.png'
		return (
			
		  <div>
			  {buttonElement}
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
						<Route path="/profile/:username" element={<HoldingPage />} />
						<Route path="/start" element={<QuestionPage />} />
					</Routes>
				</Router>
			</div>
	  	</div>
	)


}



export default App;




