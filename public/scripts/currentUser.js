import { getPersonData } from "./data.js";

export function setCurrentUser(email,pass){
    var currrentUserObj = {
        email,
        pass
    }
    localStorage.setItem("currentUser",JSON.stringify(currrentUserObj));
}

export function getCurrentUser(){
    let currentUser = null;
    var data =  localStorage.getItem("currentUser");
    if(data){
        currentUser = data;
    }
    return JSON.parse(currentUser);
}

export function unsetCurrentUser(){
    localStorage.setItem("currentUser","");
}

export function getCurrentUserName(){
    let data = getPersonData();
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
    let data = getPersonData();
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