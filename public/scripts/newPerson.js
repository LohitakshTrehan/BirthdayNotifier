import validateData from "./validate.js"
export default addNewPerson;
function addNewPerson() {
    var x = `
                <form>
                    <div class="form-group">
                        <label for="Name">Name:</label>
                        <input type="text" class="form-control" id="Name" placeholder="Type your name here">
                    </div>
                    <div class="form-group">
                        <label for="BirthDate">Birth Date:</label>
                        <input type="date" class="form-control" id="BirthDate" placeholder="Type your Birth Date here">
                    </div>
                    <div class="form-group">
                        <label for="MobileNum">Mobile Number:</label>
                        <input type="text" class="form-control" id="MobileNum" placeholder="Type your mobile number here">
                    </div>
                    <div class="form-group">
                        <label for="Email">Email:</label>
                        <input type="text" class="form-control" id="Email" placeholder="Type your email here">
                    </div>
                    <button id="SavePerson" type="submit" class="btn btn-primary">Save</button>
                </form>
    `
    var mainContent = document.getElementById('main-content');
    mainContent.innerHTML = x;
    document.getElementById("SavePerson").addEventListener('click',function(event){validateData(event);});
}