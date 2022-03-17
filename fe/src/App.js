
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";

import axios from 'axios';
import './App.css';
import RegisterScreen from './components/handleSubmit';


// Set initial image on screen
var url = 'https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0

// main super function
const App = () => {
	var [question,setImage] = useState(url)
	const [questionList,setQuestionList] = useState('')
	const [data, setData] = useState({
		email: "",
		first: "",
		last: ""
	  });

// getting the questions
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
// dislaying the questions
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

	///// submit form data

	const handleChange = (e) => {
		const value = e.target.value;
		setData({
		  ...data,
		  [e.target.name]: value
		});
	  };

	  const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
		  email: data.email,
		  first: data.first,
		  last: data.last
		};
		axios.post("http://127.0.0.1:8000/user", userData).then((response) => {
		console.log(response.status);
		console.log(response.data.token);
		});
	};


	// const submitButton = document.getElementById("submitButton");

	// submitButton.addEventListener("click", () => {
	// 	// event.preventDefault();
	// 	var email = 'email@email.com';
	// 	var first = 'alex';
	// 	var last = 'stevenson';
	// 	axios.post('http://127.0.0.1:8000/user', {
	// 		 email: email,
	// 		 first: first,
	// 		 last: last 
	// 		})
	// 	  .then(response=>{
	// 		console.log(response);
	// 		console.log(response.data);
	// 		alert(response)
	// 		window.location = "/holding-page" //This line of code will redirect you once the submission is succeed
	// 	  })
	//   });


	// Set the slide heading
	var headingWords = 'Cisco Formula Fun!'
	// Set the button text
	var buttonText = 'Begin!'
    // produce header element with variable from above
    var headingElement = <p className="heading">{headingWords}</p>
	// produce button text with variable from above
	var buttonElement = <button className="mainButton" onClick={imageHandler}>{buttonText}</button>
    // hardcoded user data for testing
	var username = 'test_user'
	var carNumber = 3

// 5 functions to display five different pages
	
// page 1
	function LandingPage() {
		return (
		  	<div>
				{/* <img src='https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'></img> */}
				<button className="mainButton"><Link to="/register">Let's Register</Link></button>
				<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>
			</div>
		);
	  }
// page 2
	  function RegisterPage() {
		  headingWords = "Race Registration"
		  setImage('https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/cars-palmtrees.jpg?raw=true')
		  
		  username = 'who?'
		   
		  return (

	// This is the form to collect user data
			<center>
			<form name="f" onSubmit={handleSubmit}>
			<label>First Name: </label>
				<input 
					type="text" 
					name="first" 
					value={data.first}
					placeholder="Enter first name"
					// required
					onChange={handleChange}
					id="fname" >
				  </input>
			  <br></br>
			  <label>Last Name: </label>
			  	<input 
				  type="text" 
				  name="last" 
				  value={data.last}
				  placeholder="Enter last name" 
				//   required
				  onChange={handleChange}
				  id="lname" >
				</input>
			  <br></br>
			  <label>Email Addr: </label>
			  	<input 
				  type="email" 
				  name="email" 
				  value={data.email}
				  placeholder="Enter email" 
				//   required
				  onChange={handleChange}
				  id="emailId"  
				//   onKeyUp="emailValidate()" 
                  >
				</input>
			  <br></br>
			  <button type="submit" id="submitButton" className="mainButton"><Link to="/holding-page">Register</Link></button>
			</form>
			</center>
		);
	  }
// page 3
	  function HoldingPage() {
		headingWords = "Your Are Car #" + carNumber
		setImage("https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/lambo_speedometer.gif?raw=true")
		return (
		<center>
		  <div>
			<h2>Welcome, {data.first}!</h2>
			<h3>START YOUR ENGINES!</h3>
			<button className="mainButton"><Link to="/start-page">Start!</Link></button>
		  </div>
		  </center>
		);
	  }

// page 4
	function StartPage() {
		setImage("https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/starting-light.gif?raw=true")
		return (
			
		  <div>
			<center>
			<button  onClick={imageHandler} className="mainButton"><Link to="/race">Race!</Link></button>
			</center>
		  </div>
	  );
	  }
// page 5	
	  function QuestionPage() {
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
						<Route path="/start-page" element={<StartPage />} />
						<Route path="/race" element={<QuestionPage />} />
					</Routes>
				</Router>
			</div>
	  	</div>
	)
}

export default App;




