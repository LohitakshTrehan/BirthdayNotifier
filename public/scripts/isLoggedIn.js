export function isLoggedIn(){
    let currentUser = null;
    let currentData = localStorage.getItem('currentUser');
    if(currentData){
        currentUser = JSON.parse(currentData);
    }
    let listOfcredentials = null;
    let data = localStorage.getItem('credentials');
    if(data){
        listOfcredentials = JSON.parse(data);
    }

    if(currentUser && listOfcredentials){
        for(let user of listOfcredentials){
            if(user.email === currentUser.enteredEmail && user.pass === currentUser.pass){
                return true;
            }
        }
    }
    return false;
}