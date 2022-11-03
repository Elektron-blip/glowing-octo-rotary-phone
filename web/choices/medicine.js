const updatedosage = document.getElementById("update-dosage");
const deletedosage = document.getElementById("delete-medicine");
const newmed = document.getElementById("new-medicine");
const submitButtonupdate = document.getElementById("submit-button-update");
const submitButtondelete = document.getElementById("submit-button-delete");
const submitButtonnew = document.getElementById("submit-button-new");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
var getusername = new URLSearchParams(location.search);

const username = getusername.get('username')

submitButtonupdate.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = updatedosage.medname.value;
    const dosage = parseInt(updatedosage.dosage.value);

    if (medname && dosage) {
        fetch(`https://old-person.elektron.space/medicines/select?username=${username}`)
            .then(response => {
                response.json().then(response => {
                    let data = response;
                    if (data.state == "Failed") { stuffErrorMsg.style.opacity = 1 } else {
                        if (medname) {
                            data.data[1][medname].inventory += dosage;
                            fetch(`https://old-person.elektron.space/medicines/update?username=${username}&data=${JSON.stringify(data.data[1])}`, {
                                method: 'PATCH',
                            })
                        } else { stuffErrorMsg.style.opacity = 1; }
                    }
                })
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})


submitButtondelete.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = deletedosage.medname.value;

    if (medname) {
        fetch(`https://old-person.elektron.space/medicines/select?username=${username}`)
            .then(response => {
                response.json().then(response => {
                    let data = response;
                    if (data.state == "Failed") { stuffErrorMsg.style.opacity = 1 } else {

                        data.data[1][medname] = undefined;
                        fetch(`https://old-person.elektron.space/medicines/update?username=${username}&data=${encodeURIComponent(JSON.stringify(data.data[1]))}`, {
                            method: 'PATCH',
                        })

                    }
                })
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})

submitButtonnew.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = newmed.medname.value;
    const dosage = newmed.dosage.value;
    const inventory = parseInt(newmed.inventory.value);
    const medtime = newmed.medtime.value.split(",");

    if (medname && dosage && inventory && medtime) {
        fetch(`https://old-person.elektron.space/medicines/select?username=${username}`)
            .then(response => {
                response.json().then(response => {
                    let data = response;
                    if (data.data !== null) {
                        data.data[1][medname] = { "dosage": dosage, "inventory": inventory, "medtime": medtime };
                        fetch(`https://old-person.elektron.space/medicines/update?username=${username}&data=${encodeURIComponent(JSON.stringify(data.data[1]))}`, {
                            method: 'PATCH',
                        })
                    } else {
                        data.data =[{medname: { "dosage": dosage, "inventory": inventory, "medtime": medtime }},]
                        console.log(data)
                        fetch(`https://old-person.elektron.space/medicines/insert?username=${username}&data=${encodeURIComponent(JSON.stringify(data.data[1]))}`, {
                            method: 'PUT',
                        })
                    }
                })
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})