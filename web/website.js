const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    fetch( `https://old-person.elektron.space/username/select?username=${username}` )
    .then( response => {
    let data = response.json()
    if (data.username === password) {
        location.href = `choice.html?username=${username}`
    } else {
        loginErrorMsg.style.opacity = 1;
    }})
})
