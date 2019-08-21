import validateData from "./validate.js"
export default signUp;
function signUp() {
    if(document.getElementById("loginDiv")!==null)
        document.getElementById("loginDiv").remove();
    if(document.getElementById("main-content")!==null)
        document.getElementById("main-content").remove();
    if(document.getElementById("homepage_nav")!==null)
        document.getElementById("homepage_nav").remove();
    document.getElementById("bodyTag").setAttribute("style","");

    var mainContentDiv = document.createElement("div");
    mainContentDiv.setAttribute("class","container-fluid");
    mainContentDiv.setAttribute("id","signup-div");
    document.getElementById("bodyTag").prepend(mainContentDiv);
    var x = `
            <div class="d-flex justify-content-center">
                <div class="card">
                    <div class="form-group">
                        <label for="Name">Name:</label>
                        <input type="text" class="form-control" id="Name" placeholder="Type your name here">
                    </div>
                    <div class="form-group">
                        <label for="BirthDate">Birth Date:</label>
                        <input type="date" class="form-control" id="BirthDate" placeholder="Type your Birth Date here">
                    </div>
                    <div class="form-group">
                        <label for="empId">Employee Id:</label>
                        <input type="text" class="form-control" id="empId" placeholder="Type Employee Id here">
                    </div>
                    <div class="form-group">
                        <label for="Email">Email:</label>
                        <input type="text" class="form-control" id="Email" placeholder="Type your email here">
                    </div>
                    <div class="form-group">
                        <label for="pass">Password(atleast 3 characters):</label>
                        <input type="password" class="form-control" id="pass" placeholder="Type your password here">
                    </div>
                    <button id="RegisterPerson" type="submit" class="btn btn-primary">SignUp</button>
                </form>
            </div>
    `
    mainContentDiv.innerHTML = x;

    var navBar = document.createElement("div");
    navBar.setAttribute("id","signup-nav");
    navBar.setAttribute("class","container-fluid");
    navBar.innerHTML = `
                        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
                            <a class="navbar-brand" href="#" onClick="document.location.reload(true)">
                                <img src="./assets/ION_logo.png" width="50" height="30" alt="">
                            </a>
                            <a class="navbar-brand" href="#" onClick="document.location.reload(true)">Birthday Notifier</a>
                        </nav>
    `;
    document.getElementById("bodyTag").prepend(navBar);

    document.getElementById("RegisterPerson").addEventListener('click',function(event){validateData(event);});
}