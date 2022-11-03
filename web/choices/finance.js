const information = document.getElementById("submit-new-info");
const submitButton = document.getElementById("submit-button");
const stuffErrorMsg = document.getElementById("stuff-error-msg");

fetch( `https://old-person.elektron.space/alarms/finance/select?username=${username}` ,{mode:"no-cors"})
.then( response => {
let data = response.json()
console.log(data)
old_time.textContent(data);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const accno = information.acc-no.value;
    const branch = information.branch.value;
    const loans = information.loans.value;


    if (branch && loans && accno){
    fetch(`https://old-person.elektron.space/emergency/update?username=${username}&data=${accno}`,{
        method:'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({'username':username,
        'accno':accno,
        'branch':branch,
        'loan':loans})
        })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})