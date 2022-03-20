import React, { Componen, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {objectToQueryString} from './UserAdd';

// // // Initialize data object for user
// const initialData = Object.freeze({
// 	email: "",
// 	first: "",
// 	last: "",
// 	id: ""
//   });

// // // Set image on screen
// var url = '.../public/cars-palmtrees.jpg'

// // // State for data
// const [data, setData] = useState(data);

// ///// handle form input
// const handleChange = (event) => {
// 	setData({
// 		...data,
// 		[event.target.name]: event.target.value.trim()
// 	});
// 	}
// /// handle form submission
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// // building api call
// 		const dbURL = "http://127.0.0.1:8000/user?"
// 		var reqParams = {
// 			email: data.email,
// 			first: data.first,
// 			last: data.last
// 		}
// // use imported utility function from other module
// 		var uriParams = objectToQueryString(reqParams)
// // post to api
// 		axios.post(dbURL + uriParams)
// // api call response
// 		.then((response) => {
// 		console.log(response.status);
// // this is User ID: response.data._id
// // setting user id into data object
// 		setData({
// 			email: data.email,
// 			first: data.first,
// 			last: data.last,
// 			id: response.data._id
// 		})
// 	})
// 	.catch((error) => {
// 		if (error.response) {
// 			console.log(error.response);
// 			console.log("server responded");
// 		} else if (error.request) {
// 			console.log("network error");
// 		} else {
// 			console.log(error);
// 	}
// 	})


// // const RegisterPage = () => {
// // 	let headingWords = "Race Registration"

// return(

// // This is the form to collect user data
// <center>
// <form name='form'>
// <label htmlFor="fname">First Name: </label>
// 	<input 
// 		type="text" 
// 		name="first" 
// 		placeholder="Enter first name"
// 		// required
// 		value={data.first}
// 		onChange={handleChange}
// 		id="fname"
// 		maxLength='25'
// 		minLength='1'
// 		>
// 		</input>
// 	<br></br>
// 	<label>Last Name: </label>
// 	<input 
// 		type="text" 
// 		name="last" 
// 		value={data.last}
// 		placeholder="Enter last name" 
// 	//   required
// 		onChange={handleChange}
// 		id="lname" 
// 		>
// 	</input>
// 	<br></br>
// 	<label>Email Addr: </label>
// 	<input 
// 		type="email" 
// 		name="email" 
// 		value={data.email}
// 		placeholder="Enter email" 
// 	//   required
// 		onChange={handleChange}
// 		id="emailId"  
// 	//   onKeyUp="emailValidate()" 
// 		>
// 	</input>
// 	<br></br>
// 	<button type="submit" id="submitButton" className="mainButton" onClick={(event) => handleSubmit(event)}><Link to="/holding-page">Register</Link></button>
// </form> 
// </center>
// )
// }