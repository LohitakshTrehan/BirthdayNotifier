export function loginPage() {
    var x = `
            <div class="card w-25 text-center">
                <div class="card-body">
                    <h3 class="card-title">ION Birthday Notifier</h3>
                    <br>
                    <div class="card-text">
                        <span><b>E-mail:</b></span><input class="form-control" type="text"></input>
                        <br>
                        <span><b>Password:</b></span><input class="form-control" type="password"></input>
                    </div>
                    <br>
                    <a href="#" class="btn btn-primary">Sign In</a>
                    <br>
                    <a href="#">New here? Sign Up!</a>
                </div>
            </div>
    `;
    var myDiv = document.createElement("div");
    myDiv.setAttribute("class","d-flex justify-content-center myClass")
    myDiv.innerHTML = x;
    var bodyTag = document.getElementById("bodyTag").appendChild(myDiv);
    bodyTag.setAttribute("style","background-image: url('./assets/ION_logo.png'); height: 300px; background-position: center; background-repeat: no-repeat;")
}