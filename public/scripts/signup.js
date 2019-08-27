import {saveData, getPersonData} from "./data.js"
import {setCurrentUser} from "./currentUser.js"
window.onload = function(){
    document.getElementById("RegisterPerson").addEventListener('click',function(event){
        event.preventDefault();
        //start registering the person and look for inline error marking
        var isValid = validate();
        //name,dob,email,pass,empId
        if(isValid){
            //save user, save current user, redirect to home
            let name = document.getElementById("Name");
            let name_value = name.value.trim();
            let dob = document.getElementById("BirthDate").value;
            let enteredEmail = document.getElementById("Email").value;
            let pass = document.getElementById("pass").value;
            let empId = document.getElementById("empId").value;
            saveData(name_value,dob,enteredEmail,pass,empId);
            //save current user, redirect to home
            setCurrentUser(enteredEmail,pass);
            window.location.href = "http://"+window.location.host+"/home.html"
        }
    });
}

function validate(){
    
    //NO VALIDATION TEST FOR 29, 30, 31 FEB OR ANY OTHER INVALID DATE FOR A MONTH OR AN IMPROPER MONTH ARE CODED, IN CASE ERROR, DEFAULT DATE = 1, DEFAULT MONTH = 1

    var letters = /^[A-Za-z]+$/;
    var email = /.+@iongroup.com$/
    var empIdPattern = /^[a-zA-Z]\-[0-9]+$/;
    var dob = document.getElementById("BirthDate").value;
    var name = document.getElementById("Name");
    var name_value = name.value.trim();
    var nameArr = name_value.split(" ");
    var enteredEmail = document.getElementById("Email").value;
    var empId = document.getElementById("empId").value;
    var pass = document.getElementById("pass").value;
    var confirm_pass = document.getElementById("confirm_pass").value;
    var isValid = true;
    var err = 0;
    for(let i=0;i<nameArr.length;i++){
        if(nameArr[i].match(letters)===null){
            document.getElementById("wrap_name").setAttribute("class","mb-1");
            if(name.classList.contains("is-valid"))
                name.classList.remove("is-valid");
            if(name.classList.contains("is-invalid"))
                name.classList.remove("is-invalid");
            name.classList.add("is-invalid")
            document.getElementById("err_name").style["display"]="inline";
            isValid = false;
            err = 1;
            break;
        }
    }

    if(err===0){
        document.getElementById("wrap_name").setAttribute("class","mb-3");
        if(name.classList.contains("is-valid"))
            name.classList.remove("is-valid");
        if(name.classList.contains("is-invalid"))
            name.classList.remove("is-invalid");
        name.classList.add("is-valid")
        document.getElementById("err_name").style["display"]="none";
    }

    var isBorn = seeIfBorn(dob);
    if( !isBorn || empId.match(empIdPattern)===null){
        document.getElementById("wrap_input").setAttribute("class","mb-1 d-flex flex-row");
        isValid = false;
        if(!isBorn){
            if(document.getElementById("BirthDate").classList.contains("is-valid"))
                document.getElementById("BirthDate").classList.remove("is-valid")
            if(document.getElementById("BirthDate").classList.contains("is-invalid"))
                document.getElementById("BirthDate").classList.remove("is-invalid")
            document.getElementById("BirthDate").classList.add("is-invalid")
            document.getElementById("err_birth").style["display"]="inline";
        }
        if(empId.match(empIdPattern)===null){
            if(document.getElementById("empId").classList.contains("is-valid"))
                document.getElementById("empId").classList.remove("is-valid")
            if(document.getElementById("empId").classList.contains("is-invalid"))
                document.getElementById("empId").classList.remove("is-invalid")
            document.getElementById("empId").classList.add("is-invalid")
            document.getElementById("err_empId").style["display"]="inline";
        }
    }
    if(isBorn && empId.match(empIdPattern)!==null){
        document.getElementById("wrap_input").setAttribute("class","mb-3 d-flex flex-row");
    }
    if(isBorn){
        if(document.getElementById("BirthDate").classList.contains("is-valid"))
            document.getElementById("BirthDate").classList.remove("is-valid")
        if(document.getElementById("BirthDate").classList.contains("is-invalid"))
            document.getElementById("BirthDate").classList.remove("is-invalid")
        document.getElementById("BirthDate").classList.add("is-valid")
        document.getElementById("err_birth").style["display"]="none";
    }
    if(empId.match(empIdPattern)!==null){
        if(document.getElementById("empId").classList.contains("is-valid"))
            document.getElementById("empId").classList.remove("is-valid")
        if(document.getElementById("empId").classList.contains("is-invalid"))
            document.getElementById("empId").classList.remove("is-invalid")
        document.getElementById("empId").classList.add("is-valid")
        document.getElementById("err_empId").style["display"]="none";
    }
    
    if(enteredEmail.match(email)===null){
        document.getElementById("wrap_email").setAttribute("class","mb-1");
        if(document.getElementById("Email").classList.contains("is-valid"))
            document.getElementById("Email").classList.remove("is-valid")
        if(document.getElementById("Email").classList.contains("is-invalid"))
            document.getElementById("Email").classList.remove("is-invalid")
        document.getElementById("Email").classList.add("is-invalid")
        document.getElementById("err_email").style["display"]="inline";
        isValid = false;
    }
    else{
        document.getElementById("wrap_email").setAttribute("class","mb-3");
        if(document.getElementById("Email").classList.contains("is-valid"))
            document.getElementById("Email").classList.remove("is-valid")
        if(document.getElementById("Email").classList.contains("is-invalid"))
            document.getElementById("Email").classList.remove("is-invalid")
        document.getElementById("Email").classList.add("is-valid")
        document.getElementById("err_email").style["display"]="none";
    }

    if(pass.length<5){
        document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
        isValid = false;
        if(document.getElementById("pass").classList.contains("is-valid"))
            document.getElementById("pass").classList.remove("is-valid")
        if(document.getElementById("pass").classList.contains("is-invalid"))
            document.getElementById("pass").classList.remove("is-invalid")
        document.getElementById("pass").classList.add("is-invalid")
        document.getElementById("err_pass").style["display"]="inline";

        if(document.getElementById("confirm_pass").classList.contains("is-valid"))
            document.getElementById("confirm_pass").classList.remove("is-valid")
        if(document.getElementById("confirm_pass").classList.contains("is-invalid"))
            document.getElementById("confirm_pass").classList.remove("is-invalid")
        document.getElementById("err_cpass").style["display"]="none";
    }
    else{
        if(document.getElementById("pass").classList.contains("is-valid"))
            document.getElementById("pass").classList.remove("is-valid")
        if(document.getElementById("pass").classList.contains("is-invalid"))
            document.getElementById("pass").classList.remove("is-invalid")
        document.getElementById("pass").classList.add("is-valid")
        document.getElementById("err_pass").style["display"]="none";
        if(pass!==confirm_pass){
            document.getElementById("wrap_pass").setAttribute("class","mb-1 d-flex flex-row");
            if(document.getElementById("confirm_pass").classList.contains("is-valid"))
                document.getElementById("confirm_pass").classList.remove("is-valid")
            if(document.getElementById("confirm_pass").classList.contains("is-invalid"))
                document.getElementById("confirm_pass").classList.remove("is-invalid")
            document.getElementById("confirm_pass").classList.add("is-invalid")
            document.getElementById("err_cpass").style["display"]="inline";
            isValid = false;
        }
        else{
            document.getElementById("wrap_pass").setAttribute("class","mb-3 d-flex flex-row");
            if(document.getElementById("confirm_pass").classList.contains("is-valid"))
                document.getElementById("confirm_pass").classList.remove("is-valid")
            if(document.getElementById("confirm_pass").classList.contains("is-invalid"))
                document.getElementById("confirm_pass").classList.remove("is-invalid")
            document.getElementById("confirm_pass").classList.add("is-valid")
            document.getElementById("err_cpass").style["display"]="none";
        }
    }
    if(emailExists(enteredEmail)){
        document.getElementById("wrap_email").setAttribute("class","mb-1");
        if(document.getElementById("Email").classList.contains("is-valid"))
            document.getElementById("Email").classList.remove("is-valid")
        if(document.getElementById("Email").classList.contains("is-invalid"))
            document.getElementById("Email").classList.remove("is-invalid")
        document.getElementById("Email").classList.add("is-invalid")
        document.getElementById("err_email_exists").style["display"]="inline";
        isValid = false;
    }
    else{
        document.getElementById("wrap_email").setAttribute("class","mb-3");
        if(document.getElementById("Email").classList.contains("is-valid"))
            document.getElementById("Email").classList.remove("is-valid")
        if(document.getElementById("Email").classList.contains("is-invalid"))
            document.getElementById("Email").classList.remove("is-invalid")
        document.getElementById("Email").classList.add("is-valid")
        document.getElementById("err_email_exists").style["display"]="none";
    }
    return isValid;
}

function seeIfBorn(bornOn){
    if(bornOn==="")
        return false;
    var today = new Date();
    var getYear = today.getFullYear();
    bornOn = bornOn.split("/");
    if(parseInt(bornOn[2])<getYear){
        return true;
    }
    else{
        return false;
    }
}

function emailExists(email){
    var persons = getPersonData()
    if(persons===null)
        return false;
    else{
        for(var person of persons){
            if(person.email === email)
                return true
        }
    }
    return false
}