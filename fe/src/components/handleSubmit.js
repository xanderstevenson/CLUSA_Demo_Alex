import React from 'react'
import axios from 'axios';
import {objectToQueryString} from './UserAdd';


// export function handleSubmit(e){
//     e.preventDefault();
// // building api call
//     const dbURL = "http://127.0.0.1:8000/user?"
//     var reqParams = {
//         email: data.email,
//         first: data.first,
//         last: data.last
//     }
// // use imported utility function from other module
//     var paramsForURI = objectToQueryString(reqParams)
// // post to api
//     axios.post(dbURL + paramsForURI)
// // api call response
//     .then((response) => {
//     console.log(response.status);
// // this is User ID: response.data._id
// // setting user id into data object
//     setData({
//         email: data.email,
//         first: data.first,
//         last: data.last,
//         id: response.data._id
//     })
// })
// .catch((error) => {
//     if (error.response) {
//         console.log(error.response);
//         console.log("server responded");
//     } else if (error.request) {
//         console.log("network error");
//     } else {
//         console.log(error);
// }
// })		
// }