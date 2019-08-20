import {getPersonData} from "./data.js"
export function showList() {
    var data = getPersonData();
    var x=``;
    if(data){
        for(let i=0; i<data.length; i++){
            x += `
                    <div class="list-group">
                        <a data-toggle="collapse" href="#person_${i}" aria-expanded="false" aria-controls="person_${i}" class="list-group-item list-group-item-action">${data[i].name}</a>
                        <div class="collapse" id="person_${i}">
                            <div class="card card-body">
                                <p>
                                    <span>Name:${data[i].name}</span> <br>
                                    <span>Email:${data[i].email}</span> <br>
                                    <span>Date of Birth: ${data[i].dob[2]}/${data[i].dob[1]}/${data[i].dob[0]}</span> <br>
                                    <a type="button" class="btn btn-info" target="_blank" href='https://connect.iongroup.com/person/${data[i].connectionId}'>Open ${data[i].name}'s Connection</a>
                                </p>
                            </div>
                        </div>
                    </div>
            `
        }
    }
    if(x===``){
        x = "No person is registered till now"
    }
    var mainContent = document.getElementById("main-content");
    mainContent.innerHTML = x;
}