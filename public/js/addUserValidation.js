const formId =document.getElementById('formId')
const nameInput =document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const errorMessage = document.getElementById('errorMessage')


formId.addEventListener('submit',(event)=>{
    const email = emailInput.value;
    const name = nameInput.value;
    const password = passwordInput.value;

    if(name.length==0){
        event.preventDefault()
        errorMessage.textContent="enter a name"
    }
    else if(!validateEmail(email)){
        event.preventDefault();
        errorMessage.textContent="Enter valid mail"
    }
    else if(password.length==0){
        event.preventDefault();
        errorMessage.textContent="password is required"
    }
})



function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
