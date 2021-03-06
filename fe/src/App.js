
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
import {Register} from './components/RegisterPage';

// Set initial image on screen
var url = 'https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
var index = 0

var timerButton


// Initialize data object for user
const initialData = Object.freeze({
	email: "",
	first: "",
	last: "",
	id: "UNK",
	number: 0,
	ip: "UNK",
	position: 0,
	start: null,
	end: null,
	userid: null
  });
// main super function
const App = () => {
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
	const imageHandler = (e) => {
		if (index < questionList.length) {
			// change button text variable to be plugged into buttonElement below
			setImage(questionList[index].filename)
			// set answer to display on QuestionPage
			questionList.Answer = questionList[index].answer
		
			index = index + 1

		} else {
			alert('Congratulation, you have completed the challenge!')
			alert('Start time: ' + data.start)
		}
		
	}
///// handle form input
	const handleChange = (event) => {
		// const {name, value } = event.target;
		// const val = value;
	setData({
		...data,
		// [name]: val
		[event.target.name]: event.target.value.trim(),
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


// 4 functions to display five different pages
	
// Page 1
// 	using imported module as function
LandingPage()

// Page 2

// compbo function combining register of user and assigning of car
function RegisterUserAndAssignCar(e){
	handleSubmit(e)
	AssignCar(data.id)
}


function RegisterPage(){
	setImage('./cars-palmtrees.jpg')

	return (

     {Register}

// This is the form to collect user data
	// <center>

	// <form name='form'>
	// <label htmlFor="fname"></label>
	// 	<input 
	// 		className='registerInput'
	// 		type="text" 
	// 		name="first" 
	// 		placeholder="Enter First Name"
	// 		// required
	// 		value={data.first}
	// 		onChange={handleChange}
	// 		id="fname"
	// 		maxLength='25'
	// 		minLength='1'
	// 		>
	// 		</input>
	// 	<br></br>
	// 	<label></label>
	// 	<input 
	// 		className='registerInput'
	// 		type="text" 
	// 		name="last" 
	// 		value={data.last}
	// 		placeholder="Enter Last Name" 
	// 	//   required
	// 		onChange={handleChange}
	// 		id="lname" 
	// 		>
	// 	</input>
	// 	<br></br>
	// 	<label></label>
	// 	<input 
	// 		className='registerInput'
	// 		type="email" 
	// 		name="email" 
	// 		value={data.email}
	// 		placeholder="Enter Email" 
	// 	//   required
	// 		onChange={handleChange}
	// 		id="emailId"  
	// 	//   onKeyUp="emailValidate()" 
	// 		>
	// 	</input>
	// 	<br></br>
	// 	<button type="submit" id="submitButton" className="mainButton" onClick={(event) => RegisterUserAndAssignCar(event)}><Link to="/start-page">Register</Link></button>
	// </form> 
	// </center>
);
}

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
// used to alert - for testing and debugging only
			let userInfo = 'Name: ' + data.first + data.last + '\n' 
						+ 'Email: ' + data.email + '\n'
						+ 'ID: ' + data.id + '\n'
						+ 'Car : ' + data.number + '\n'
						+ 'IP: ' + data.ip + '\n'
			console.log(userInfo)
	}


// page 3

function startTimer(){
	
	const timer = document.getElementById('timer');
	let timerInterval;
	// Firs twe start by clearing the existing timer, in case of a restart
	clearInterval(timerInterval);
	// Then we clear the variables
	let second = 0,
	  minute = 0

  
	// Next we set a interval every 1000 ms
	timerInterval = setInterval(function () {
	  // Toggle the odd class every interval
	//   timer.classList.toggle('odd');
  
	  // We set the timer text to include a two digit representation
	  timer.innerHTML =

		(minute < 10 ? '0' + minute : minute) +
		':' +
		(second < 10 ? '0' + second : second);
  
	  // Next, we add a new second since one second is passed
	  second++;
  
	  // We check if the second equals 60 "one minute"
	  if (second === 60) {
		// If so, we add a minute and reset our seconds to 0
		minute++;
		second = 0;
	  }
  
	}, 1000);
  };

  


const LoadFirstQuestionAndStartTimer = () => {
	imageHandler()
	startTimer()
}

function StartPage() {
	setImage("./lambo_speedometer.gif")
	timerButton = <button id='timer' className='mainButton'>00:00</button>
	return (
		<div>
		<center>
		<h2 id='welcomeText'>{data.first}, you are Assigned Car #{data.number}</h2>
		<button  onClick={LoadFirstQuestionAndStartTimer} className="mainButton"><Link to="/race">Race!</Link></button>
		</center>
		</div>
	);
}

// page4 - where questions are displayed / rotated




function QuestionPage() {
	
	function handleChoice(choice) {
		console.log('Your choice is ' + choice)
		console.log('The answer is ' + questionList.Answer)
		if (choice === questionList.Answer){
			// make API call to move car position forward
			axios.put('http://127.0.0.1:8000/score?user_id=' + data.id + '&weight=1')
				.then((response) => {
				})
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
		    // load next question
			imageHandler()
		}
		else {
			axios.put('http://127.0.0.1:8000/score?user_id=' + data.id + '&weight=-1')
				.then((response) => {
				})
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
			alert('Wrong!') 
		}
	};
	// timerButton = <button id='timer' className='mainButton'>00:00</button>
return (
	<div>
		<center>
			<button href='' class='btnChoices' id='firstBTN' onClick={(event) => handleChoice('A')}>A</button>
			<button href='' class='btnChoices' id='secondBTN' onClick={(event) => handleChoice('B')}>B</button>
			<button href='' class='btnChoices' id='thirdBTN' onClick={(event) => handleChoice('C')}>C</button>
			<button href='' class='btnChoices' id='fourthBTN' onClick={(event) => handleChoice('D')}>D</button>
			<br></br>
			<button id='pageAndAnswerDisplay' className="mainButton" onClick={imageHandler}>Question #{index}</button>
			<p>The Answer is {questionList.Answer}</p>
		</center>
	</div>
);
}
QuestionPage()
// main biolerplate HTML for all pages

return (
	<div className="page">
		<div className="container">
			<center><img id='devDash' src='./DevDash.png' alt='DevDash logo'></img></center>
			{/* <p className="heading">Cisco Dev Dash</p> */}
			<div className="img-holder">
				<img src={question} alt="" id="img" className="img" />
			</div>
			<Router>
				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route exact path="/register" element={<RegisterPage/>} />
					<Route path="/start-page" element={<StartPage imageHandler={imageHandler} />} />
					<Route path="/race" element={<QuestionPage />} />
				</Routes>
			</Router>
			
			{/* <button id='timer' className='mainButton'>00:00</button> */}
			{timerButton}
		</div>
	</div>
	)
}
export default App;