import React from 'react';
import axios from 'axios';

export default class PersonAdd extends React.Component {
  state = {
    name: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      first: this.state.first,
      last: this.state.last
    };

    axios.post(`http://127.0.0.1:8000/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
			<label>First Name: </label>
				<input 
					type="text" 
					name="first" 
	
					placeholder="Enter first name"
					// required
					onChange={this.handleChange}
					id="fname" >
				  </input>
			  <br></br>
			  <label>Last Name: </label>
			  	<input 
				  type="text" 
				  name="last" 
	
				  placeholder="Enter last name" 
				//   required
				  onChange={this.handleChange}
				  id="lname" >
				</input>
			  <br></br>
			  <label>Email Addr: </label>
			  	<input 
				  type="email" 
				  name="email" 

				  placeholder="Enter email" 
				//   required
				  onChange={this.handleChange}
				  id="emailId"  
				//   onKeyUp="emailValidate()" 
                  >
				</input>
			  <br></br>
			  {/* <button type="submit" id="submitButton" className="mainButton" onClick={this.handleSubmit}>Register</button> */}
			</form>
      </div>
    )
  }
}
