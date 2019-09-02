import { getData } from "./data.js";

export function setCurrentUser(email,pass){
    var currrentUserObj = {
        email,
        pass
    }
    localStorage.setItem("currentUser",JSON.stringify(currrentUserObj));
}

export function unsetCurrentUser(){
    localStorage.setItem("currentUser","");
}


export function getCurrentUser(){
    let currentUser = null;
    var data =  getDBdata("currentUser")
    //localStorage.getItem("currentUser");
    if(data){
        currentUser = data;
    }
    return JSON.parse(currentUser);
}


export function getCurrentUserName(){
    let data = getData();
    let name = "";
    if(data){
        for(let person of data){
            if(person.email === getCurrentUser().email){
                name = person.name;
            }
        }
    }
    return name;
}

export function getCurrentUserIndex(email){
    let data = getData();
    let currUserIndex = 0;
    if(data){
        for(let person of data){
            if(person.email === getCurrentUser().email){
                break;
            }
            currUserIndex++;
        }
    }
    return currUserIndex;
}