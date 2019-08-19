export default showList
function showList(data) {
    var x=``;
    if(data){
        for(let i=0; i<data.length; i++){
            x += `
                    <div class="list-group">
                        <a data-toggle="collapse" href="#person_${i}" aria-expanded="false" aria-controls="person_${i}" class="list-group-item list-group-item-action">${data[i].name}</a>
                        <div class="collapse" id="person_${i}">
                            <div class="card card-body">
                                <p>
                                    Name:${data[i].name} <br>
                                    Mobile:${data[i].num} <br>
                                    Email:${data[i].email} <br>
                                    Date of Birth: ${data[i].dob[2]}/${data[i].dob[1]}/${data[i].dob[0]}
                                </p>
                                <!-- <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-outline-dark">Edit</button>
                                    <button type="button" class="btn btn-outline-danger">Delete</button>
                                </div> -->
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