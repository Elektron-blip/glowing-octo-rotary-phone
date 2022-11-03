const date = document.getElementById("submit-newdate");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = date.name.value;
    const newdate = date.new-date.value;

    if (name && date ){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})