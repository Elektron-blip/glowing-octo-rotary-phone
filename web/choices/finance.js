const information = document.getElementById("submit-new-info");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");


submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const accno = information.acc-no.value;
    const branch = information.branch.value;
    const loans = information.loans.value;


    if (branch && loans && accno){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})