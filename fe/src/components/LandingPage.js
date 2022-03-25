import React from "react";
import { Link } from 'react-router-dom';

export function LandingPage() {
	return (
		
		<div>
			{/* <img src='https://github.com/xanderstevenson/CLUSA_Demo_Alex/blob/alex_local/backend/media/Devvie-checkered-flag.jpeg?raw=true'></img> */}
			<button className="mainButton"><Link to="/register">Let's Register</Link></button>
			<center><img id="devnetIcon" src="./purple-devnet-sharp.jpeg" alt="Devnet logo, purple"></img></center>
		</div>
	);
}