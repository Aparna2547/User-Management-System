const frmId = document.getElementById('formId')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const errorMessage = document.getElementById('errorMessage')
console.log('error...');

frmId.addEventListener('submit',(event)=>{
    const email = emailInput.value;
    console.log(email);
    const password = passwordInput.value;
    if(!validateEmail(email)){
        event.preventDefault()
        errorMessage.textContent = "Please enter a valid email.."
    }else if(password.length == 0){
        event.preventDefault()
        errorMessage.textContent="Enter the password"

    }

})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
