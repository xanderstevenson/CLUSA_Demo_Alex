
import axios from 'axios';


// function random_item(items){
//     return items[Math.floor(Math.random()*items.length)];    
// }

// var respObj = {
//     number: 0,
//     ip: "",
//     position: 0,
//     start: null,
//     end: null,
//     userid: null,
// }

export function AssignCar(id) {

    var respObj = {}
    var userId = id

    let allCarsURL = "http://127.0.0.1:8000/start"
    // get request ot to api, no params required
    axios.put(allCarsURL + "?userid=" + userId)
    // api call response
    .then((response) => {
        console.log(response.status);
        console.log('ip address = ' + (response.data)["ip"])
        

        // get car assignment
        // resp = AssignCar()
        respObj.number = response.data["number"]
        respObj.ip = response.data["ip"]
        respObj.position = response.data["position"]
        respObj.start = response.data["start"]
        respObj.end = response.data["end"]
        respObj.userid = response.data["userid"]

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
