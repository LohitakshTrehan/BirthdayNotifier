import signUp from "./signup.js"
import { isLoggedIn } from "./isLoggedIn.js";
import { home } from "./home.js";
import { getCredentialData, getPersonData } from "./data.js";
export function loginPage() {
    if(document.getElementById("signup-div")!==null)
        document.getElementById("signup-div").remove();
    if(document.getElementById("signup-nav")!==null)
        document.getElementById("signup-nav").remove();

    var x = `
            <div class="shadow card w-25 text-center">
                <div class="card-body">
                    <h3 class="card-title">ION Birthday Notifier</h3>
                    <br>
                    <div class="card-text">
                        <span><b>E-mail:</b></span><input id="login_email" class="form-control" type="text"></input>
                        <br>
                        <span><b>Password:</b></span><input id="login_pass" class="form-control" type="password"></input>
                    </div>
                    <br>
                    <a href="#" id="checkCredentials" class="btn btn-primary">Sign In</a>
                    <br>
                    <a href="#" id="signupForm">New here? Sign Up!</a>
                </div>
            </div>
    `;
    document.getElementById("bodyTag").setAttribute("style","background-image: url('./assets/ION_logo.png'); height: 300px; background-position: center; background-repeat: no-repeat;")
    var myDiv = document.createElement("div");
    myDiv.setAttribute("class","d-flex justify-content-center myClass")
    myDiv.setAttribute("id","loginDiv");
    myDiv.innerHTML = x;
    document.getElementById("bodyTag").prepend(myDiv);

    //check credentials here on click of signIn button
    
    //link to signup page
    document.getElementById("signupForm").addEventListener("click",function(e){e.preventDefault();signUp();})
    var check = isLoggedIn();
    if(check){
        home();
    }
    document.getElementById("checkCredentials").addEventListener("click",function(e){
        e.preventDefault();
        if(matchCredentials()){
            home();
        }
        else{
            alert("wrong credentials")
        }
    })
}

function matchCredentials(){
    let email = document.getElementById("login_email").value;
    let pass = document.getElementById("login_pass").value;
    let credentialList = getCredentialData();
    let data = getPersonData();
    let i=0;
    if(credentialList!==null){
        for(let credential of credentialList){
            if(credential.email === email && credential.pass === pass){
                localStorage.setItem("currentUser",JSON.stringify({name:data[i].name,enteredEmail:email,pass}))
                return true;
            }
            i++;
        }
    }
    return false;
}