const date = document.getElementById("submit-newdate");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')


fetch( `https://old-person.elektron.space/alarms/birthdays/select?username=${username}` ,{mode:"no-cors"})
.then( response => {
let data = response.json()
console.log(data)
old_time.textContent(data);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = date.name.value;
    const newdate = date.new-date.value;

    if (name && date ){
    fetch(`https://old-person.elektron.space/birthdays/update?username=${username}&data=${newdate}`,{
    method:'PUT',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({'username':username,
     'name':name,
     'date':newdate})
     })
    // }).then(response=>{
    //     return response.json()
    // })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})