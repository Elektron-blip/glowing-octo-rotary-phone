const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

var dic = {"hehe":'hehe'
}


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (dic[username] === password) {
        location.href = "choice.html"
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})