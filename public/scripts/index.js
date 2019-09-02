import { getCredentialData } from "./data.js";
import { setCurrentUser } from "./currentUser.js";

window.signInButtonClickHandler = (event)=>{
    event.preventDefault();
    let email = document.getElementById("login_email").value
    let pass = document.getElementById("login_pass").value
    email = email + "@iongroup.com"
    let data = getCredentialData() || {};
    let currentUserLogin = null;
    let emailNotFound = true;
    for(let user of data){
        if(user.email === email){
            currentUserLogin = user;
            emailNotFound = false;
        }
    }
    if(emailNotFound){
        userDoesNotExist();
    }
    else{
        userExists();
        if(currentUserLogin.pass === pass){
            //set currentUser, redirect to home page
            correctCredentials();
            setCurrentUser(currentUserLogin.email,currentUserLogin.pass)
            window.location.href = "http://"+window.location.host+"/home.html" 
        }
        else{
            wrongCredentials();
        }
    }
    
}

function userDoesNotExist(){
    //emailNotExist, email-input-wrapper, login_email
    let emailWrapper = document.getElementById("email-input-wrapper");
    emailWrapper.setAttribute("class","input-group");
    let loginElem = emailWrapper.getElementById("login_email");
    loginElem.classList.add("is-invalid");
    emailWrapper.getElementById("emailNotExist").style.display="inline";
    
}

function userExists(){
    let emailWrapper = document.getElementById("email-input-wrapper");
    emailWrapper.setAttribute("class","input-group mb-4");
    let loginElem = emailWrapper.getElementById("login_email");
    loginElem.classList.remove("is-invalid")
    emailWrapper.getElementById("emailNotExist").style.display="none";
}

function wrongCredentials(){
    document.getElementById("wrong_cred").style.display="inline";
}
function correctCredentials(){
    document.getElementById("wrong_cred").style.display="none";
}