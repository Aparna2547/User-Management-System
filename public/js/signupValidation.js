const formId = document.getElementById('formValidate')
const nameInput = document.getElementById('frmname')
const emailInput = document.getElementById('frmemail')
const passwordInput =document.getElementById('frmpassword')
const c_passwordInput = document.getElementById('c_password')
const errorMessage = document.getElementById("errorMessage")


formId.addEventListener('submit',(event)=>{
    const name =nameInput.value;
    const email=emailInput.value;
    const password= passwordInput.value;
    const c_password = c_passwordInput.value;

    if(name.length ==0){
        event.preventDefault()
        errorMessage.textContent = "Name is required."
    }
    else if(!validateEmail(email)){
        event.preventDefault();
        errorMessage.textContent="Enter a valid email..."
    }
    else if(password.length ==0){
        event.preventDefault()
        errorMessage.textContent = "enter password"
    }
    else if(password!==c_password){
        event.preventDefault();
        errorMessage.textContent ="passwords are not matching.."
    }

})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
