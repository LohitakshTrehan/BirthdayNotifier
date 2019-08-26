window.onload = function(){
    document.getElementById("RegisterPerson").addEventListener('click',function(event){
        event.preventDefault();
        //start registering the person and look for inline error marking
        var isValid = validate();
    });
    console.log("signUp.js called");
}

function validate(){
    var letters = /^[A-Za-z]+$/;
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var empIdPattern = /^[a-zA-Z]\-[0-9]+$/;
    var dob = document.getElementById("BirthDate").value; //empId, pass
    console.log(dob);
    var name = document.getElementById("Name").value.trim();
    var nameArr = name.split(" ");
    var enteredEmail = document.getElementById("Email").value;
    var empId = document.getElementById("empId").value;
    var pass = document.getElementById("pass").value;
    var confirm_pass = document.getElementById("confirm_pass").value;

    var err = "";
    for(let i=0;i<nameArr.length;i++){
        if(nameArr[i].match(letters)===null){
            err+="Name field contains more than one white space together, or something else than alphabets\n";
            break;
        }
    }

    if(enteredEmail.match(email)===null){
        err+="format of entered email is incorrect \n"
    }

    if(empId.match(empIdPattern)===null){
        err+="incorrect format of empId\n";
    }

    if(pass.length<3){
        err+="password length too short\n";
    }

    if(pass!==confirm_pass){
        err+="the passwords dont match"
    }
    
    console.log(err)
}