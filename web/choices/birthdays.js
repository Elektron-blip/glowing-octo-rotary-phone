const date = document.getElementById("submit-newdate");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
const old_list = document.getElementById("old-list");
var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')


fetch(`https://old-person.elektron.space/birthdays/select?username=${username}`).then(response => {
    response.json().then(data => {
        console.log(data);
        old_list.textContent = data.data[1];
    })
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = date.name.value;
    const newdate = date.new - date.value;
    const data = { "name": name, "date": newdate }
    if (name && date) {
        fetch(`https://old-person.elektron.space/birthdays/update?username=${username}&data=${encodeURIComponent(JSON.stringify(data))}`, {
            method: 'PUT',
        }).then(response => {
            let data = response.json();
            if (data.state == "Failed") {
                fetch(`https://old-person.elektron.space/birthdays/update?username=${username}&data=${encodeURIComponent(JSON.stringify(data))}`, {
                    method: 'PATCH',
                })
            }
        })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})