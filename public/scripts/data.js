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
    var oldPersonData = getData() || [];
    var oldCredentialData = getCredentialData() || [];
    oldPersonData.push(personObj);
    setDBData('data', JSON.stringify(oldPersonData));
    oldCredentialData.push(credentialObj);
    setDBData('credentials', JSON.stringify(oldCredentialData));
}
export function getDBdata(storageKey){
    let listOfPersons = null;
    let data = localStorage.getItem(storageKey);
    if(data){
        listOfPersons = JSON.parse(data);
    }
    return listOfPersons;
}

export function setDBData(storageKey, data){
    if(storageKey){
        localStorage.setItem(storageKey, data);    
    }
}


export function getData(){
    return getDBdata('data');
}
export function getCredentialData(){
    return getDBdata('credentials');
}

export function saveListData(dataList,credentialList){
    setDBData('data', JSON.stringify(dataList));
    setDBData('credentials', JSON.stringify(credentialList));
}