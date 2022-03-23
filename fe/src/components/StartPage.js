
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';



export const StartPage = (props) => {

    

    return (
        // setImage("./starting-light.gif")

            <div>
            <center>
           <button  onClick={props.imageHandler} className="mainButton"><Link to="/race">Race!</Link></button> 
            {/* <button type="submit" id="submitButton" className="mainButton" onClick={(event) => handleSubmit(event)}><Link to="/holding-page">Register</Link></button> */}
            </center>
            </div>
        )
    



}


	
    
