const num = document.getElementById("submit-number-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

fetch( `https://old-person.elektron.space/alarms/emergency/select?username=${username}` ,{mode:"no-cors"})
.then( response => {
let data = response.json()
console.log(data)
old_time.textContent(data);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newnum = num.newnum.value;

    if (newnum){
        fetch(`https://old-person.elektron.space/emergency/update?username=${username}&data=${newnum}`,{
            method:'PUT',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username,
            'number':newnum})
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})