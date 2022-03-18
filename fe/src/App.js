
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";
import axios from 'axios';
import './App.css';
import {objectToQueryString} from './components/UserAdd';

// Set initial image on screen
var url = 'https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0

// Initialize data object for user
const initialData = Object.freeze({
	email: "",
	first: "",
	last: "",
	id: ""
  });
// main super function
const App = () => {
	var [question,setImage] = useState(url)
	const [questionList,setQuestionList] = useState('')
	const [data, setData] = useState(initialData);

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
///// handle form input
	const handleChange = (event) => {
	setData({
		...data,
		[event.target.name]: event.target.value.trim()
	});
	}
/// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
// building api call
		const dbURL = "http://127.0.0.1:8000/user?"
		var reqParams = {
			email: data.email,
			first: data.first,
			last: data.last
		}
// use imported utility function from other module
		var uriParams = objectToQueryString(reqParams)
// post to api
		axios.post(dbURL + uriParams)
// api call response
		.then((response) => {
		console.log(response.status);
// this is User ID: response.data._id
// setting user id into data object
		setData({
			email: data.email,
			first: data.first,
			last: data.last,
			id: response.data._id
		})
	})
	.catch((error) => {
		if (error.response) {
			console.log(error.response);
			console.log("server responded");
		} else if (error.request) {
			console.log("network error");
		} else {
			console.log(error);
	}
	})		
}
// end of App() super function

// Set the slide heading
var headingWords = 'Cisco DevNet Dash!'
// Set the button text
var buttonText = 'Begin!'
// produce header element with variable from above
var headingElement = <p className="heading">{headingWords}</p>
// produce button text with variable from above
var buttonElement = <button className="mainButton" onClick={imageHandler}>{buttonText}</button>
// hardcoded user data for testing
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
const RegisterPage = () => {
	headingWords = "Race Registration"
	setImage('https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/cars-palmtrees.jpg?raw=true')
	
	return (
// This is the form to collect user data
	<center>
	<form name='form'>
	<label htmlFor="fname">First Name: </label>
		<input 
			type="text" 
			name="first" 
			placeholder="Enter first name"
			// required
			value={data.first}
			onChange={handleChange}
			id="fname"
			maxLength='25'
			minLength='1'
			>
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
			id="lname" 
			>
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
		<button type="submit" id="submitButton" className="mainButton" onClick={handleSubmit}><Link to="/holding-page">Register</Link></button>
	</form> 
	</center>
);
}
// page 3
const HoldingPage = () => {
headingWords = "Your Are Car #" + carNumber
setImage("https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/fe/public/lambo_speedometer.gif?raw=true")
return (
<center>
	<div>
	<p>Welcome, {data.first}</p>
	<p>ID # {data.id} </p> 
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
// page 5 - where questions are displayed / rotated
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