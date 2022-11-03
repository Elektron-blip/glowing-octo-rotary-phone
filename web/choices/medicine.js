const updatedosage = document.getElementById("update-dosage");
const deletedosage = document.getElementById("delete-medicine");
const newmed = document.getElementById("new=medicine");
const submitButtonupdate = document.getElementById("submit-button-update");
const submitButtondelete= document.getElementById("submit-button-delete");
const submitButtonnew = document.getElementById("submit-button-new");
const stuffErrorMsg = document.getElementById("stuff-error-msg");


submitButtonupdate.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = updatedosage.medname.value;
    const dosage = updatedosage.dosage.value;

    if (medname && dosage){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})

submitButtondelete.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = deletedosage.medname.value;

    if (medname){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})

submitButtonnew.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = newmed.medname.value;
    const dosage = newmed.dosage.value;
    const inventory = newmed.inventory.value;
    const medtime = newmed.medtime.value;
    const image = newmed.image.value;
    
    if (medname && dosage && inventory && medtime && image){
        // check if time is valid and do stuff
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})