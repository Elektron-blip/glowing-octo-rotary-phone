const time = document.getElementById("submit-alarm-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newtime =time.newtime.value;

    if (newtime){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})