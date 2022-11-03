const updatedosage = document.getElementById("update-dosage");
const deletedosage = document.getElementById("delete-medicine");
const newmed = document.getElementById("new=medicine");
const submitButtonupdate = document.getElementById("submit-button-update");
const submitButtondelete= document.getElementById("submit-button-delete");
const submitButtonnew = document.getElementById("submit-button-new");
const stuffErrorMsg = document.getElementById("stuff-error-msg");


const username = getusername.get('username')

submitButtonupdate.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = updatedosage.medname.value;
    const dosage = updatedosage.dosage.value;

    if (medname && dosage){
        fetch(`https://old-person.elektron.space/medicine/update?username=${username}&numbers=${medname}`,{
            method:'PUT',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username,
            'name':medname,
            'inventory':dosage})
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})


submitButtondelete.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = deletedosage.medname.value;

    if (medname){
        fetch(`https://old-person.elektron.space/medicine/delete?username=${username}&data=${medname}`,{
            method:'PUT',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username,
            'name':medname})
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})

submitButtonnew.addEventListener("click", (e) => {
    e.preventDefault();
    const medname = newmed.medname.value;
    const dosage = newmed.dosage.value;
    const inventory = newmed.inventory.value;
    const medtime = newmed.medtime.value;
    const image = newmed.image.value;
    const reader = new FileReader();
    const fileByteArray = [];
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = (evt) => {
    if (evt.target.readyState === FileReader.DONE) {
      const arrayBuffer = evt.target.result,
        array = new Uint8Array(arrayBuffer);
      for (const a of array) {
        fileByteArray.push(a);
      }
      console.log(fileByteArray)
    }
  }



    if (medname && dosage && inventory && medtime && image){
        fetch(`https://old-person.elektron.space/medicine/insert?username=${username}&data=${medname}`,{
            method:'PUT',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username,
            'name':medname,
            'dosage':dosage,
            'time':medtime,
            'image':fileByteArray})
            })
    } else {
        stuffErrorMsg.style.opacity = 1;
    }
})