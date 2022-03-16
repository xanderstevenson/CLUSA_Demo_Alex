import React from "react";
// import { Link } from 'react-router-dom';

export function Register() {
  return (
    <center>
    <form name="f">
      First Name: <input type="text" id="fname" ></input>
      <br></br>
      Last Name: <input type="text" id="lname" ></input>
      <br></br>
      Email Address: <input type="text" id="emailId"  onkeyup="emailValidate()" ></input>
      <br></br>
      <input type="submit"></input>
      <input type="reset"></input>
    </form>
    </center>
  );
}