export default validateData
import {saveData} from './data.js'
import {getCredentialData} from './data.js'
import {getPersonData} from './data.js'
import { isLoggedIn } from './isLoggedIn.js';
import {home} from './home.js'
import { loginPage } from './login.js';
function validateData(event){
    event.preventDefault();
    var letters = /^[A-Za-z]+$/;
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    var dob = document.getElementById("BirthDate").value; //empId, pass
    
    var name = document.getElementById("Name").value.trim();
    var nameArr = name.split(" ");
    var err = "";
    for(let i=0;i<nameArr.length;i++){
        if(nameArr[i].match(letters)===null){
            err+="Name field contains more than one white space together, or something else than alphabets\n";
            break;
        }
    }

    var enteredEmail = document.getElementById("Email").value;
    if(enteredEmail.match(email)===null){
        err+="format of entered email is incorrect \n"
    }

    var empId = document.getElementById("empId").value;
    if(empId.match(/^[a-zA-Z]\-[0-9]+$/)===null){
        err+="incorrect format of empId\n";
    }

    var pass = document.getElementById("pass").value;
    if(pass.length<3){
        err+="password length too short\n";
    }

    if(err!==""){
        alert(err);
    }
    else{
        var check = checkIfUniqueUser(enteredEmail, empId);
        //save the validated data
        if(check){
            localStorage.setItem("currentUser",JSON.stringify({name,enteredEmail,pass}));
            saveData(name,dob,enteredEmail,pass,empId);
            let isUserLoggedIn = isLoggedIn();
            if(isUserLoggedIn)
                home();
            else
                loginPage();
        }
        else
            alert("user with same empId or email already exists")
        //save current user credential and call isLoggedin
    }
}

function checkIfUniqueUser(enteredEmail, empId){
    let credentialList = getCredentialData();
    let data = getPersonData();
    if(credentialList!==null){
        for(let credential of credentialList){
            if(credential.email===enteredEmail)
                return false;
        }
    }
    if(data!==null){
        for(let person of data){
            if(person.connectionId === empId.trim().split("-")[1])
                return false;
        }
    }
    return true;
}