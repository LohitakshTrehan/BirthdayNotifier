export function isLoggedIn(){
    var data = [{email:"a@b.com",pass:"123"}]
    localStorage.setItem('credentials', JSON.stringify(data));
    return false;
}