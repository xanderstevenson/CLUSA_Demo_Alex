
import React, { useState, useEffect, initialState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";
import axios from 'axios';
import './App.css';
import {objectToQueryString} from './components/UserAdd';
import {LandingPage} from './components/LandingPage';
// import {AssignCar} from './components/AssignCar';
import { delay } from './components/Delay';

// Set initial image on screen
var url = 'https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0




// Initialize data object for user
const initialData = Object.freeze({
	email: "",
	first: "",
	last: "",
	id: "",
	number: null,
	ip: "",
	position: 0,
	start: null,
	end: null,
	userid: null
  });
// main super function
const App = (props) => {
// State for images
	var [question,setImage] = useState(url)
// State for question
	const [questionList,setQuestionList] = useState('')
// State for data
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
	const imageHandler = ({imageHandler}, e) => {
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
		const dbURL = "http://127.0.0.1:8000/"
		var reqParams = {
			email: data.email,
			first: data.first,
			last: data.last
		}
// use imported utility function from other module
		var uriParams = objectToQueryString(reqParams)
// post to api
		axios.post(dbURL + "user?" + uriParams)
// api call response
		.then((response) => {		
			
// setting user id into data object
		setData({
			email: data.email,
			first: data.first,
			last: data.last,
			id: response.data._id,

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

	console.log('data id = ' + data.id)
}
// end of App() super function

// Set the slide heading
var headingWords = 'Cisco DevNet Dash!'
// Set the button text
var buttonText = 'Next!'
// produce header element with variable from above
var headingElement = <p className="heading">{headingWords}</p>
// produce button text with variable from above
var buttonElement = <button className="mainButton" onClick={imageHandler}>{buttonText}</button>
// hardcoded user data for testing
var carNumber = null

// 5 functions to display five different pages
	
// Page 1
// 	using imported module as function
LandingPage()

// Page 2
const RegisterPage = () => {
	headingWords = "Race Registration"
	setImage('./cars-palmtrees.jpg')
	
	
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
		<button type="submit" id="submitButton" className="mainButton" onClick={(event) => handleSubmit(event)}><Link to="/holding-page">Register</Link></button>
	</form> 
	</center>
);
}
// page 3
// get car assignment

function AssignCar(id) {


	// get car assignment
	var respObj
	
		var userId = id
	
		let allCarsURL = "http://127.0.0.1:8000/start"
		// get request ot to api, no params required
		axios.put(allCarsURL + "?userid=" + userId)
		// api call response
			.then((response) => {
				console.log(response.status);
				console.log('ip address = ' + (response.data)["ip"])
	
				// get car assignment
				respObj = {
					number: 0,
				}
				
				respObj.number = response.data["number"]
				console.log('car number = ' + respObj.number)
				respObj.ip = response.data["ip"]
				respObj.position = response.data["position"]
				respObj.start = response.data["start"]
				respObj.end = response.data["end"]
				respObj.userid = response.data["userid"]
				console.log(respObj)
				setData({
					email: data.email,
					first: data.first,
					last: data.last,
					id: respObj.userid,
					number: respObj.number,
					ip: respObj.ip,
					position: respObj.position,
					start: respObj.start,
					end: respObj.end,
					userid: respObj.userid
				})
			}
			)
			.catch((error) => {
				if (error.resp) {
					console.log(error.response);
					console.log("server responded");
				} else if (error.request) {
					console.log("network error");
				} else {
					console.log(error);
			}
			})
	}
	


const HoldingPage = () => {
headingWords = "Your Are Car #" + carNumber
setImage("./lambo_speedometer.gif")

return (
<center>
	<div>
	<p>Name: {data.first} {data.last}</p>
	<p>Email: {data.email}</p>
	<p>ID # {data.id} </p>
	<p>Car # {data.number}</p>
	<p>IP Address : {data.ip}</p>

	<button onClick={() => AssignCar(data.id)} className="mainButton">Get Car Assign</button>
	<button className="mainButton"><Link to="/start-page">Go to Start</Link></button>
	</div>
	</center>
);
}
// page 4

// StartPage()





function StartPage() {
	setImage("./starting-light.gif")
	return (
		<div>
		<center>
		<p>Car # {data.number}</p>
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
QuestionPage()
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
					<Route path="/start-page" element={<StartPage imageHandler={imageHandler} />} />
					<Route path="/race" element={<QuestionPage />} />
				</Routes>
			</Router>
		</div>
	</div>
	)
}
export default App;