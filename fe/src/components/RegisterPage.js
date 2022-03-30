import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {objectToQueryString} from './UserAdd';

export function Register(props){
	// props.setImage('./cars-palmtrees.jpg')

	return (

// This is the form to collect user data
	<Register>
    <center>

	<form name='form'>
	<label htmlFor="fname"></label>
		<input 
			className='registerInput'
			type="text" 
			name="first" 
			placeholder="Enter First Name"
			// required
			value={props.data.first}
			onChange={props.handleChange}
			id="fname"
			maxLength='25'
			minLength='1'
			>
			</input>
		<br></br>
		<label></label>
		<input 
			className='registerInput'
			type="text" 
			name="last" 
			value={props.data.last}
			placeholder="Enter Last Name" 
		//   required
			onChange={props.handleChange}
			id="lname" 
			>
		</input>
		<br></br>
		<label></label>
		<input 
			className='registerInput'
			type="email" 
			name="email" 
			value={props.data.email}
			placeholder="Enter Email" 
		//   required
			onChange={props.handleChange}
			id="emailId"  
		//   onKeyUp="emailValidate()" 
			>
		</input>
		<br></br>
		<button type="submit" id="submitButton" className="mainButton" onClick={(event) => props.RegisterUserAndAssignCar(event)}><Link to="/start-page">Register</Link></button>
	</form> 
	</center>
    </Register>
);
}