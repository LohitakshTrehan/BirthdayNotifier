export function saveData(name,dob,email,pass,empId){
    var dobArr = dob.split("/");
    var connectionId = empId.trim()
    var personObj = {
        name,
        dob : dobArr,
        email,
        connectionId
    }

    var credentialObj = {
        email,
        pass
    }
    var oldPersonData = getPersonData()
    var oldCredentialData = getCredentialData();
    if(oldPersonData===null || oldCredentialData===null){
        var data = [personObj];
        localStorage.setItem('data', JSON.stringify(data));
        var credentials = [credentialObj];
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }
    else{
        oldPersonData.push(personObj);
        localStorage.setItem('data', JSON.stringify(oldPersonData));
        oldCredentialData.push(credentialObj);
        localStorage.setItem('credentials', JSON.stringify(oldCredentialData));
    }
}
export function getPersonData(){
    let listOfPersons = null;
    let data = localStorage.getItem('data');
    if(data){
        listOfPersons = JSON.parse(data);
    }
    return listOfPersons;
}

export function getCredentialData(){
    let listOfcredentials = null;
    let data = localStorage.getItem('credentials');
    if(data){
        listOfcredentials = JSON.parse(data);
    }
    return listOfcredentials;
}

export function saveListData(dataList,credentialList){
    localStorage.setItem('data', JSON.stringify(dataList));
    localStorage.setItem('credentials', JSON.stringify(credentialList));
}