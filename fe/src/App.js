
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Welcome screen before displaying the first question
const url = 'https://github.com/xanderstevenson/CLUS_Demo/blob/master/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0
// Set the slide heading
var headingWords = 'Cisco Formula Fun!'
// Set the button text
var buttonText = 'Begin!'

const App = () => {
	const [question,setImage] = useState(url)
	const [questionList,setQuestionList] = useState('')

	useEffect( () => {
		if( questionList === '' ) {
			axios.get('http://localhost:8000/api')
			.then (response => {
				setQuestionList(response.data)
			})
		}
	}, []);

	const imageHandler = (e) => {
		if (index < questionList.length) {
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


	return (
		<div className="page">
			<div className="container">
				{headingElement}
				<div className="img-holder">
					<img src={question} alt="" id="img" className="img" />
				</div>
				{buttonElement}
				<br></br>
				<center><img id="devnetIcon" src="https://github.com/xanderstevenson/CLUS_Demo/blob/master/fe/public/purple-devnet-sharp.jpeg?raw=true" alt="Devnet log, purple"></img></center>	
			</div>
		</div>
	)

}










export default App;