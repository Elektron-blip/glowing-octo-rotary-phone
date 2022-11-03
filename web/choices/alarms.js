const time = document.getElementById("submit-alarm-form");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
const old_time = document.getElementById("oldtime");

var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')


fetch( `https://old-person.elektron.space/alarms/select?username=${username}` ,{mode:"no-cors"})
.then( response => {
let data = response.json()
console.log(data)
old_time.textContent(data);
})



submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newtime =time.newtime.value;

    if (newtime.lenght <= 20){
    fetch(`https://old-person.elektron.space/alarms/update?username=${username}&data=${newtime}`,{
    method:'PUT',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({'username':username, 'time':newtime})
    })
       } else {
        stuffErrorMsg.style.opacity = 1;
    }
})