import {showList} from "./showList.js";

export function home(){
    //delete current child node loginDiv
    if(document.getElementById("loginDiv")!==null)//moves to home scren from signup page/ login page or is directly loggedIn
        document.getElementById("loginDiv").remove()
    if(document.getElementById("signup-div")!==null){//moves to home scren from signup page/ login page or is directly loggedIn
        document.getElementById("signup-div").remove()
        document.getElementById("signup-nav").remove()
    }
    //delete body style
    document.getElementById("bodyTag").setAttribute("style","");
    //make div and append br and other div
    var mainContentDiv = document.createElement("div");
    mainContentDiv.setAttribute("class","container-fluid");
    mainContentDiv.setAttribute("id","main-content");
    document.getElementById("bodyTag").prepend(mainContentDiv);

    var br = document.createElement("br");
    document.getElementById("bodyTag").prepend(br);

    var navBar = document.createElement("div");
    navBar.setAttribute("class","container-fluid");
    navBar.innerHTML = `
                        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
                            <a class="navbar-brand" href="#" onClick="document.location.reload(true)">
                                <img src="./assets/ION_logo.png" width="50" height="30" alt="">
                            </a>
                            <a class="navbar-brand" href="#" onClick="document.location.reload(true)">Birthday Notifier</a>
                            <img class="ml-auto navbar-brand" src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png">
                            <a class="navbar-brand">${JSON.parse(localStorage.getItem('currentUser')).name}</a>
                            <button id="logout" class="navbar-brand btn btn-outline-primary">Logout</button>
                        </nav>
    `;
    //append child to body
    document.getElementById("bodyTag").prepend(navBar);

    //add logout functionality
    document.getElementById("logout").addEventListener("click",function() {
        localStorage.setItem("currentUser",JSON.stringify(""));
        document.location.reload(true);
    })
    showList();
    //fetch data and modify the home page layout
    
}