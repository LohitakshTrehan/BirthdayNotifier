export default validateData
import {saveData} from './data.js'
function validateData(event){
    event.preventDefault();
    var letters = /^[A-Za-z]+$/;
    var numbers = /^[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var dob = document.getElementById("BirthDate").value;
    var name = document.getElementById("Name").value.trim();
    var nameArr = name.split(" ");
    var err = "";
    for(let i=0;i<nameArr.length;i++){
        if(nameArr[i].match(letters)===null){
            err+="Name field contains more than one white space together, or something else than alphabets\n";
            break;
        }
    }
    var MobileNum = document.getElementById("MobileNum").value;
    if(MobileNum.match(numbers)===null){
        err+="mobile number doesnt contain 10 digits\n";
    }
    var enteredEmail = document.getElementById("Email").value;
    if(enteredEmail.match(email)===null){
        err+="format of entered email is incorrect \n"
    }

    if(err!==""){
        alert(err);
    }

    else{
        //save the validated data
        saveData(name,dob,MobileNum,enteredEmail);
        window.location.reload();
    }
}