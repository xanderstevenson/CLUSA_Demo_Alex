
import axios from 'axios';


// function random_item(items){
//     return items[Math.floor(Math.random()*items.length)];    
// }



export function AssignCar(id) {


// get car assignment
var respObj

    var userId = id

    let allCarsURL = "http://127.0.0.1:8000/start"
    // get request ot to api, no params required
    axios.put(allCarsURL + "?userid=" + userId)
    // api call response
        .then((response) => {
            console.log(response.status);
            console.log('ip address = ' + (response.data)["ip"])

            // get car assignment
            respObj = {
                number: 0,
            }
            
            respObj.number = response.data["number"]
            console.log('car number = ' + respObj.number)
            respObj.ip = response.data["ip"]
            respObj.position = response.data["position"]
            respObj.start = response.data["start"]
            respObj.end = response.data["end"]
            respObj.userid = response.data["userid"]
            console.log(respObj)
            
        }
        )
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
