import {getPersonData} from "./data.js"
export function showList() {
    var data = getPersonData();
    var x=``;
    if(data){
        for(let i=0; i<data.length; i++){
            x += `
                    <div class="list-group">
                        <a data-toggle="collapse" href="#person_${i}" aria-expanded="false" aria-controls="person_${i}" class="list-group-item list-group-item-action"><b>${data[i].name}</b></a>
                        <div class="collapse" id="person_${i}">
                            <div class="card card-body">
                                <p>
                                    <span>Name:${data[i].name}</span> <br>
                                    <span>Email:${data[i].email}</span> <br>
                                    <span>Date of Birth: ${data[i].dob[2]}/${data[i].dob[1]}/${data[i].dob[0]}</span> <br>
                                    <a type="button" class="btn btn-info btn-sm" target="_blank" onClick="window.open('https://connect.iongroup.com/person/${data[i].connectionId}','Connection Profile','height=900,width=1000')">Open ${data[i].name}'s Connection</a>
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

    /////////////////////////////////////////////////////////////////////////////////
    // var css = 'div {box-sizing: border-box;border: 0.5px solid red;}';
    // var head = document.head || document.getElementsByTagName('head')[0];
    // var style = document.createElement('style');
    // style.innerHTML = css;
    // head.appendChild(style);

    var mainContent = document.getElementById("main-content");

    //make left container DIVs
    var outerLeftDiv = document.createElement("div");
    outerLeftDiv.setAttribute("class","p-3");
    outerLeftDiv.setAttribute("style","flex: 1 1 0;overflow: auto;");
    var innerLeftDiv = document.createElement("div");
    innerLeftDiv.setAttribute("style","overflow: auto; max-height: 800px;");
    innerLeftDiv.setAttribute("id","list_all_bday");
    innerLeftDiv.innerHTML =`<h2><b>All Birthday's</b></h2><br>`+ x; //////////////////////////////////////////////////setting main content here
    outerLeftDiv.appendChild(innerLeftDiv);
    mainContent.appendChild(outerLeftDiv);

    //make right container DIVs
    var outerRightDiv = document.createElement("div");
    outerRightDiv.setAttribute("class","p-2");
    outerRightDiv.setAttribute("style","flex: 1 1 0;display: flex;flex-direction: column;");
    var upperRightDiv = document.createElement("div");
    upperRightDiv.setAttribute("class","p-2 mt-2");
    upperRightDiv.setAttribute("style","max-height: 400px;flex: 1;overflow: auto;");
    upperRightDiv.setAttribute("id","list_today_bday");
    var lowerRightDiv = document.createElement("div");
    lowerRightDiv.setAttribute("class","p-2");
    lowerRightDiv.setAttribute("style","max-height: 400px;flex: 1;overflow: auto;");
    lowerRightDiv.setAttribute("id","list_upcoming_bday");
    upperRightDiv.innerHTML = `<h4><b>Today's Birthday</b></h4><br>`+x;//////////////////////////////////////////////////////////////////////////////
    lowerRightDiv.innerHTML = `<br><h4><b>Upcoming Birthday's</b></h4><br>`+x;///////////////////////////////////////////////////////////////////////////////////////
    outerRightDiv.appendChild(upperRightDiv);
    outerRightDiv.appendChild(lowerRightDiv);
    mainContent.appendChild(outerRightDiv);
}
