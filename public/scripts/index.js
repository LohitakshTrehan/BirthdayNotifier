import { getCredentialData } from "./data.js";
import { setCurrentUser } from "./currentUser.js";

window.onload = function(){
    document.getElementById("checkCredentials").addEventListener("click",function(event){
        event.preventDefault();
        let email = document.getElementById("login_email").value
        let pass = document.getElementById("login_pass").value
        email = email + "@iongroup.com"
        let data = getCredentialData()
        if(data === null){
            userDoesNotExist();
        }
        else{
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
    })
}

function userDoesNotExist(){
    //emailNotExist, wrap_email, login_email
    document.getElementById("wrap_email").setAttribute("class","input-group");
    if(document.getElementById("login_email").classList.contains("is-valid"))
        document.getElementById("login_email").classList.remove("is-valid")
    if(document.getElementById("login_email").classList.contains("is-invalid"))
        document.getElementById("login_email").classList.remove("is-invalid")
    document.getElementById("login_email").classList.add("is-invalid")
    document.getElementById("emailNotExist").style["display"]="inline";
    if(!document.getElementById("emailNotExist").classList.contains("mb-2"))
        document.getElementById("emailNotExist").classList.add("mb-2")
}

function userExists(){
    document.getElementById("wrap_email").setAttribute("class","input-group mb-4");
    if(document.getElementById("login_email").classList.contains("is-valid"))
        document.getElementById("login_email").classList.remove("is-valid")
    if(document.getElementById("login_email").classList.contains("is-invalid"))
        document.getElementById("login_email").classList.remove("is-invalid")
    if(document.getElementById("emailNotExist").classList.contains("mb-2"))
        document.getElementById("emailNotExist").classList.remove("mb-2")
    document.getElementById("emailNotExist").style["display"]="none";
}

function wrongCredentials(){
    document.getElementById("wrong_cred").style["display"]="inline";
}
function correctCredentials(){
    document.getElementById("wrong_cred").style["display"]="none";
}