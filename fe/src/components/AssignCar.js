import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


function random_item(items){
    return items[Math.floor(Math.random()*items.length)];    
}



export function AssignCar() {

    var respObj

    let allCarsURL = "http://127.0.0.1:8000/cars"
    // get request ot to api, no params required
    let resp = axios.get(allCarsURL)
    // api call response
    .then((resp) => {
        console.log(resp.status);
        console.log('ip address = ' + random_item(resp.data)["ip"])
        
        respObj = {
            number: 0,
            ip: "",
            position: 0,
            start: null,
            end: null,
            userid: null,
        }
        // get car assignment
        // resp = AssignCar()
        respObj.number = resp.data["number"]
        respObj.ip = resp.data["ip"]
        respObj.position = resp.data["position"]
        respObj.start = resp.data["start"]
        respObj.end = resp.data["end"]
        respObj.userid = resp.data["userid"]

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
return respObj
}