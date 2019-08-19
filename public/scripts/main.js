import addNewPerson from "./newPerson.js"
window.onload = function(){
    document.getElementById("new-person").addEventListener('click',addNewPerson);
}