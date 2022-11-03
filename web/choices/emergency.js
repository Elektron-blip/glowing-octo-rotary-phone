const num = document.getElementById("submit-number-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newnum = num.newnum.value;

    if (newnum){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})