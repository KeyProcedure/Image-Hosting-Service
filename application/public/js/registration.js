const submitButton = document.getElementById('registrationSubmit');
submitButton.addEventListener('click', validateRegistration);

const usernameInputField = document.getElementById('username');
usernameInputField.addEventListener('keydown', resetValidity);

const passwordInputField = document.getElementById('password');
passwordInputField.addEventListener('keydown', resetValidity);

const confirmPasswordInputField = document.getElementById('confirmPassword');
confirmPasswordInputField.addEventListener('keydown', resetValidity);

function resetValidity() {
    usernameInputField.setCustomValidity('');
    passwordInputField.setCustomValidity('');
    confirmPasswordInputField.setCustomValidity('');
}

function validateRegistration() {
    validateUsername();
    validatePassword();
}

function validateUsername() {
    let username = usernameInputField.value;
    let usernameMsg = document.getElementById('usernameMsg');
    let firstChar = username.charCodeAt(0);
    let valid = true;

    if (username.length < 3) {
        usernameMsg.innerHTML = 'Sorry, your username must be at least 3 characters long';
        valid = false;
    }
    else if (!isLowerCaseChar(firstChar) && !isUpperCaseChar(firstChar)) {
        usernameMsg.innerHTML = 'Sorry, your username must begin with an alphabetical character';
        valid = false;
    }
    else {
        for (let i = 1; i < username.length; i++) {
            let charValue = username.charCodeAt(i);
            if (!isLowerCaseChar(charValue) && !isUpperCaseChar(charValue) && !isDigit(charValue)) {
                usernameMsg.innerHTML = 'Sorry, your username must consist of only letters and numbers';
                valid = false;
                break;
            }
        }
    }

    if (valid) {
        usernameMsg.innerHTML = 'Username satisfies all requirements';
        usernameMsg.style.color = 'black';
        usernameInputField.style.borderColor = 'black';
        usernameInputField.setCustomValidity('');
    }
    else {
        usernameMsg.style.color = 'red';
        usernameInputField.style.borderColor = 'red';
        usernameInputField.setCustomValidity('Invalid username.');
    }
}

function validatePassword() {
    let password = document.getElementById('password');
    let passwordMsg = document.getElementById('passwordMsg');
    let valid = true;
    let upperCase = false;
    let digit = false;
    let specialChar = false;

    if (password.value.length < 8) {
        passwordMsg.innerHTML = 'Sorry, your password must be at least 8 characters long';
        valid = false;
    }
    else {
        for (let i = 0; i < password.value.length; i++) {
            let charValue = password.value.charCodeAt(i);
            if (isUpperCaseChar(charValue))
                upperCase = true;
            else if (isDigit(charValue))
                digit = true;
            else if (isSpecialChar(charValue))
                specialChar = true;
        }

        if (!upperCase) {
            passwordMsg.innerHTML = 'Sorry, your password must contain an uppercase letter';
            valid = false;
        }
        else if (!digit) {
            passwordMsg.innerHTML = 'Sorry, your password must contain a digit';
            valid = false;
        }
        else if (!specialChar) {
            passwordMsg.innerHTML = 'Sorry, your password must contain one of the following: ' +
                '/ * - + ! @ # $ ^ & ~ [ ]';
            valid = false;
        }
    }

    if (valid) {
        passwordMsg.innerHTML = 'Password satisfies all requirements';
        passwordMsg.style.color = 'black';
        password.style.borderColor = 'black';
        password.setCustomValidity('');
        validateConfirmPassword();
    }
    else {
        passwordMsg.style.color = 'red';
        password.style.borderColor = 'red';
        password.setCustomValidity('Invalid password.');
    }
}

function validateConfirmPassword() {
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let confirmPasswordMsg = document.getElementById('confirmPasswordMsg');

    if (password.value.localeCompare(confirmPassword.value) === 0) {
        confirmPasswordMsg.innerHTML = 'Passwords match';
        confirmPasswordMsg.style.color = 'black';
        confirmPassword.style.borderColor = 'black';
        confirmPassword.setCustomValidity('');
        return true;
    }
    else {
        confirmPasswordMsg.innerHTML = 'Passwords don\"t match, try again';
        confirmPasswordMsg.style.color = 'red';
        confirmPassword.value = "";
        confirmPassword.style.borderColor = 'red';
        confirmPassword.setCustomValidity('Passwords don\'t match.');
        return false;
    }
}

function isLowerCaseChar(charValue) {
    return charValue >= 97 && charValue <= 122;
}

function isUpperCaseChar(charValue) {
    return charValue >= 65 && charValue <= 90;
}

function isDigit(charValue) {
    return charValue >= 48 && charValue <= 57;
}

function isSpecialChar(charValue) {
    return charValue === 47 || charValue === 42 || charValue === 45 || charValue === 43 || charValue === 33 ||
        charValue === 64 || charValue === 35 || charValue === 36 || charValue === 94 || charValue === 38 || charValue === 126 ||
        charValue === 91 || charValue === 93;
}