// import addNewPerson from "./newPerson.js"
// import showList from "./showList.js"
// import {getData} from "./data.js"
import {isLoggedIn} from "./isLoggedIn.js"
import {loginPage} from "./login.js"
window.onload = function(){
    // var data = getData();
    // showList(data);
    // document.getElementById("new-person").addEventListener('click',addNewPerson);
    if(isLoggedIn()){

    } else {
        loginPage();
    }
}