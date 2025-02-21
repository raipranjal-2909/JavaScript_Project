var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function ValidateName(){
    var name = document.getElementById('contact-name').value.trim();

    if(name.length == 0){
        nameError.innerHTML = 'Name is required';
        return false;
    }
    else if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'Write Full Name';
        return false;
    }
    nameError.innerHTML = '<i class="fas fa-circle-check"></i>';
    return true;
};

function ValidatePhone(){
    var phone = document.getElementById('contact-phone').value.trim();

    if(phone.length === 0){
        phoneError.innerHTML = 'Phone no is required';
        return false;
    }

    if(phone.length !=10){
        phoneError.innerHTML = 'Phone no. should be 10 digits';
        return false;
    }

    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = 'Only digits please'
        return false;
    }
    phoneError.innerHTML = '<i class="fas fa-circle-check"></i>';
    return true;
    
}

function ValidateEmail(){
    var email = document.getElementById('contact-email').value.trim();

    if(email.length == 0){
        emailError.innerHTML = 'Email is required'
        return false;
    }

    if(!email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)){
        emailError.innerHTML = 'Email invalid'
        return false;
    }

    emailError.innerHTML = '<i class="fas fa-circle-check"></i>';
    return true;
}

function ValidateMessage(){
    var message = document.getElementById('contact-message').value.trim();
    var required = 30;
    var left = required - message.length;

    if(left>0){
        messageError.innerHTML = left + 'more characters required';
        return false;
    }

    messageError.innerHTML = '<i class="fas fa-circle-check"></i>';
    return true;
}

function ValidateForm(){
    if(!ValidateName() || !ValidatePhone() || !ValidateEmail() || !ValidateMessage){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(() => {
            submitError.style.display = 'none';
        }, 3000);
        return false;
    }
}