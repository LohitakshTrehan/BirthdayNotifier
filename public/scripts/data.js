export function saveData(name,dob,num,email){
    var dobArr = dob.split("-");
    var personObj = {
        name,
        dob : dobArr,
        num,
        email
    }
    var oldData = getData()
    if(oldData===null){
        var data = [personObj];
        localStorage.setItem('data', JSON.stringify(data));
    }
    else{
        oldData.push(personObj);
        localStorage.setItem('data', JSON.stringify(oldData));
    }
}
export function getData(){
    let listOfPersons = null;
    let data = localStorage.getItem('data');
    if(data){
        listOfPersons = JSON.parse(data);
    }
    return listOfPersons;
}
