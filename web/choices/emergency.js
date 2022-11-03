const num = document.getElementById("submit-number-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
const old_list = document.getElementById("old-list");
var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')

fetch(`https://old-person.elektron.space/emergency/select?username=${username}`).then(response => {
    response.json().then(data => {
        console.log(data);
        old_list.textContent = data.data[1];
    })
})



submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newtime = num.newnum.value.split(",").join("&numbers=");

    fetch(`https://old-person.elektron.space/emergency/update?username=${username}&numbers=${newtime}`, {
        method: 'PATCH',
    })
        .then(response => {
            let data = response.json();
            if (data.state == "Failed") {
                fetch(`https://old-person.elektron.space/emergency/insert?username=${username}&numbers=${newtime}`, {
                    method: 'PUT',
                })
            }
        })
})