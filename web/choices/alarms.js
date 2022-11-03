const time = document.getElementById("submit-alarm-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
const old_time = document.getElementById("oldtime");

var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')


fetch(`https://old-person.elektron.space/alarms/select?username=${username}`).then(response => {
    response.json().then(data => {
        console.log(data);
        old_time.textContent = data.data[1];
    })
})



submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newtime = time.newtime.value.split(",").join("&alarms=");

    fetch(`https://old-person.elektron.space/alarms/update?username=${username}&alarms=${newtime}`, {
            method: 'PATCH',})
})