import { getCurrentUser, unsetCurrentUser, getCurrentUserName, getCurrentUserIndex, setCurrentUser } from "./currentUser.js";
import {getPersonData, getCredentialData, saveListData} from "./data.js";
import { humanFriendlyDate, isToday, isUpcoming } from "./dateOperations.js";

window.onload = function(){
    //first check if user logged in, else redirect to login page
    checkLoggedin();
    //second attach event to logout button and change user name displayed
    document.getElementById("user-name").innerHTML = getCurrentUserName();
    document.getElementById("logout").addEventListener("click",function(event){
        event.preventDefault();
        unsetCurrentUser();
        window.location.href = "http://"+window.location.host
    })
    //add (Edit profile)
    document.getElementById("edit_profile").addEventListener("click", function(){
        editUserInfo();
    })
    document.getElementById("save-edited-profile").addEventListener("click", function(event){
        event.preventDefault();
        let isValid = validate();
        if(isValid){
            //update credential data, person data, current user data
            let name = document.getElementById("Name");
            let name_value = name.value.trim();
            let dob = document.getElementById("BirthDate").value;
            let pass = document.getElementById("pass").value;
            let empId = document.getElementById("empId").value;
            let currPersonIndex = null;
            checkLoggedin();
            let currPerson = getCurrentUser();
            currPersonIndex = getCurrentUserIndex(currPerson.email)
            let data = getPersonData();
            data[currPersonIndex].name = name_value;
            data[currPersonIndex].dob = dob.split('/')
            data[currPersonIndex].connectionId = empId.trim()
            let credentialData = getCredentialData();
            credentialData[currPersonIndex].pass = pass;
            saveListData(data,credentialData);
            let currUser = getCurrentUser();
            setCurrentUser(currUser.email,pass)
            window.location.href = "http://"+window.location.host+"/home.html"
        }
    })
    //list birthdays, remember they are stored as mm,dd,yyyy  //add links of connection and (teams),
    buildMainList();
    //optional add search, sort functionality
}

function checkLoggedin(){
    let curr_user = getCurrentUser();
    if(curr_user===null){
        window.location.href = "http://"+window.location.host
    }
    else{
        let valid_user = false;
        
        let data = getCredentialData();
        if(data !== null){
            for(let user of data){
                if(user.email === curr_user.email){
                    if(curr_user.pass === user.pass){
                        valid_user = true;
                    }
                }
            }
        }

        if(!valid_user){
            window.location.href = "http://"+window.location.host
        }
    }
}
function buildMainList(){
       
    let data = getPersonData();
    for(let person of data) {
        var clonedNode = document.getElementById("clone_main").cloneNode(true);
        clonedNode.setAttribute("id","")
        clonedNode.style["display"] = "block" 
        let outerDiv = clonedNode.children[0];
        //update person name
        outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
        //update person DOB
        outerDiv.getElementsByClassName("person-dob")[0].innerText = humanFriendlyDate(person.dob);
        //update person connection link
        outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click",()=>{
            window.open('https://connect.iongroup.com/person/'+ person.connectionId,'Connection Profile','height=900,width=1000')
        });
        //update person team link
        outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:"+person.email);
        document.getElementById("list_all_bday").appendChild(clonedNode);
    }
    let todayDate = new Date();
    let dateArr = [];
    dateArr.push(todayDate.getMonth()+1)
    dateArr.push(todayDate.getDate())
    dateArr.push(todayDate.getFullYear())
    document.getElementById("todays-date").innerHTML = humanFriendlyDate(dateArr);
    for(let person of data){
        if(isToday(person.dob)){
            var clonedNode = document.getElementById("clone_main").cloneNode(true);
            clonedNode.setAttribute("id","")
            clonedNode.style["display"] = "block" 
            let outerDiv = clonedNode.children[0];
            //update person name
            outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
            //update person DOB
            outerDiv.getElementsByClassName("person-dob-prepend")[0].style["display"] = "none"
            //update person connection link
            outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click",()=>{
                window.open('https://connect.iongroup.com/person/'+ person.connectionId,'Connection Profile','height=900,width=1000')
            });
            //update person team link
            outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:"+person.email);
            document.getElementById("list_today_bday").appendChild(clonedNode);
        }
    }
    for(let person of data) {
        if(isUpcoming(person.dob)){
            var clonedNode = document.getElementById("clone_main").cloneNode(true);
            clonedNode.setAttribute("id","")
            clonedNode.style["display"] = "block" 
            let outerDiv = clonedNode.children[0];
            //update person name
            outerDiv.getElementsByClassName("person-name")[0].innerText = person.name;
            //update person DOB
            outerDiv.getElementsByClassName("person-dob")[0].innerText = humanFriendlyDate(person.dob);
            //update person connection link
            outerDiv.getElementsByClassName("person-connection-link")[0].addEventListener("click",()=>{
                window.open('https://connect.iongroup.com/person/'+ person.connectionId,'Connection Profile','height=900,width=1000')
            });
            //update person team link
            outerDiv.getElementsByClassName("person-teams-link")[0].setAttribute("href", "sip:"+person.email);
            document.getElementById("list_upcoming_bday").appendChild(clonedNode);
        }
    }
}

function editUserInfo(){
    let currPersonData = null;
    let currPersonIndex = null;
    checkLoggedin();
    let currPerson = getCurrentUser();
    currPersonIndex = getCurrentUserIndex(currPerson.email)
    let data = getPersonData();
    currPersonData = data[currPersonIndex];
    console.log(currPersonData)
    document.getElementById("Name").setAttribute("placeholder",currPersonData.name);
    document.getElementById("BirthDate").setAttribute("placeholder",""+currPersonData.dob[0]+"/"+currPersonData.dob[1]+"/"+currPersonData.dob[2]);
    document.getElementById("empId").setAttribute("placeholder",currPersonData.connectionId);
    document.getElementById("Email").innerHTML = currPersonData.email;
}

function validate(){
    
    //NO VALIDATION TEST FOR 29, 30, 31 FEB OR ANY OTHER INVALID DATE FOR A MONTH OR AN IMPROPER MONTH ARE CODED, IN CASE ERROR, DEFAULT DATE = 1, DEFAULT MONTH = 1

    var letters = /^[A-Za-z]+$/;
    var email = /.+@iongroup.com$/
    var empIdPattern = /^C\-[0-9]+$/;
    var dob = document.getElementById("BirthDate").value;
    var name = document.getElementById("Name");
    var name_value = name.value.trim();
    var nameArr = name_value.split(" ");
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