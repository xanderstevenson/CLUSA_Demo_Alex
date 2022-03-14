
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Welcome screen before displaying the first question
const url = 'https://github.com/xanderstevenson/CLUS_Demo/blob/master/backend/media/Devvie-checkered-flag.jpeg?raw=true'
// Index to the current question
let index = 0
// Produce slide heading
var headingWords = 'DevNet Formula Fun!'

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
		} else {
			alert('Congratulation, you have completed the challenge!')
		}
	}



    var headingElement = <h1 className="heading">{headingWords}</h1>


	return (
		<div className="page">
			<div className="container">
				{headingElement}
				<div className="img-holder">
					<img src={question} alt="" id="img" className="img" />
				</div>
				<button className="image-upload" onClick={imageHandler}>Next question</button>
			</div>
		</div>
	)

}










export default App;