const information = document.getElementById("submit-new-info");
const submitButton = document.getElementById("submit-button");
const old_list = document.getElementById("old-list");
const stuffErrorMsg = document.getElementById("stuff-error-msg");
var getusername = new URLSearchParams(location.search);
const username = getusername.get('username')
fetch(`https://old-person.elektron.space/finance/select?username=${username}`).then(response => {
    response.json().then(data => {
        console.log(data);
        old_list.textContent = JSON.stringify(data.data[1]);
    })
})


submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const accno = information['acc-no'].value;
    const branch = information.branch.value;
    const loans = information.loans.value;

    const data = { "accno": accno, "branch": branch, "loans": loans }

    fetch(`https://old-person.elektron.space/finance/insert?username=${username}&data=${encodeURIComponent(JSON.stringify(data))}`, {
        method: 'PUT',
    }).then(response => {
        response.json().then(response => {
            if (response.state == "Failed") {
                fetch(`https://old-person.elektron.space/finance/update?username=${username}&data=${encodeURIComponent(JSON.stringify(data))}`, {
                    method: 'PATCH',
                })
            }
        })
    })
})