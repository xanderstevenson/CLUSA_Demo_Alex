import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


function random_item(items){
    return items[Math.floor(Math.random()*items.length)];    
}



export function AssignCar() {
    let allCarsURL = "http://127.0.0.1:8000/cars"
    // get request ot to api, no params required
    let resp = axios.get(allCarsURL)
    // api call response
    .then((resp) => {
        console.log(resp.status);
        console.log('ip address = ' + random_item(resp.data)["ip"])
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
return resp
}