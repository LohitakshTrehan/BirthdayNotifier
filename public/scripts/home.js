import { getCurrentUser, unsetCurrentUser } from "./currentUser.js";
import {getPersonData, getCredentialData} from "./data.js";
import { humanFriendlyDate } from "./dateOperations.js";

window.onload = function(){
    //first check if user logged in, else redirect to login page
    checkLoggedin();
    //second attach event to logout button
    document.getElementById("logout").addEventListener("click",function(event){
        event.preventDefault();
        unsetCurrentUser();
        window.location.href = "http://"+window.location.host
    })
    //list birthdays, remember they are stored as mm,dd,yyyy  //add links of connection and (teams),
    buildMainList();
    //add (Edit profile)
    //optional add search, sort functionality
}

function checkLoggedin(){
    let curr_user = getCurrentUser();
    if(curr_user===null){
        window.location.href = "http://"+window.location.host
    }
    else{
        let valid_user = false;
        
        let data = getCredentialData();
        if(data !== null){
            for(let user of data){
                if(user.email === curr_user.email){
                    if(curr_user.pass === user.pass){
                        valid_user = true;
                    }
                }
            }
        }

        if(!valid_user){
            window.location.href = "http://"+window.location.host
        }
    }
}
function buildMainList(){
       
    let data = getPersonData();
    for(let person of data) {
        var clonedNode = document.getElementById("clone_main").cloneNode(true);
        clonedNode.setAttribute("id","")
        clonedNode.style["display"] = "block" 
        let outerDiv = clonedNode.children[0];
        //update person name
        outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
        //update person DOB
        outerDiv.getElementsByClassName("person-dob")[0].innerText = humanFriendlyDate(person.dob);
        //update person connection link
        outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click",()=>{
            window.open('https://connect.iongroup.com/person/'+ person.connectionId,'Connection Profile','height=900,width=1000')
        });
        //update person team link
        outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:"+person.email);
            
        
        document.getElementById("list_all_bday").appendChild(clonedNode);
    }
}