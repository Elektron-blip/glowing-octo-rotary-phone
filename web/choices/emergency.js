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
    const newnum = num.newnum.value;

    if (newnum) {
        fetch(`https://old-person.elektron.space/emergency/update?username=${username}&data=${newnum}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'number': newnum
            })
        })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})