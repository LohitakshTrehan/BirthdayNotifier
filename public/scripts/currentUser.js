export function setCurrentUser(email,pass){
    var currrentUserObj = {
        email,
        pass
    }
    localStorage.setItem("currentUser",JSON.stringify(currrentUserObj));
}

export function getCurrentUser(){
    let currentUser = null;
    var data =  localStorage.getItem("currentUser");
    if(data){
        currentUser = data;
    }
    return JSON.parse(currentUser);
}

export function unsetCurrentUser(){
    localStorage.setItem("currentUser","");
}