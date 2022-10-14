const button = document.getElementById("registrationSubmit");
button.addEventListener('click', validateRegistration);

function validateRegistration() {
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    return validUsername && validPassword;
}

function validateUsername() {
    let userName = document.getElementById("username").value;
    let firstChar = userName.charCodeAt(0);
    let valid = true;

    if (userName.length < 3) {
        document.getElementById("usernameMsg").innerHTML = "sorry, your username must be at least 3 characters long";
        valid = false;
    }
    else if (!isLowerCase(firstChar) && !isUpperCase(firstChar)) {
        document.getElementById("usernameMsg").innerHTML = "sorry, your username must begin with an alphabetical character";
        valid = false;
    }
    else {
        for (let i = 1; i < userName.length; i++) {
            let charValue = userName.charCodeAt(i);
            if (!isLowerCase(charValue) && !isUpperCase(charValue) && !isDigit(charValue)) {
                document.getElementById("usernameMsg").innerHTML = "sorry, your username must consist of only letters and numbers";
                valid = false;
                break;
            }
        }
    }

    if (!valid) {
        document.getElementById("usernameMsg").style.color = 'red';
        return false;
    }
    else {
        document.getElementById("usernameMsg").innerHTML = "username satisfies all requirements!";
        document.getElementById("usernameMsg").style.color = 'black';
        return true;
    }
}

function isLowerCase(charValue) {
    return charValue >= 97 && charValue <= 122;
}

function isUpperCase(charValue) {
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

function validatePassword() {
    let password = document.getElementById("password").value;
    let valid = true;
    let upperCase = false;
    let digit = false;
    let specialChar = false;

    if (password.length < 8) {
        document.getElementById("passwordMsg").innerHTML = "sorry, your password must be at least 8 characters long";
        valid = false;
    }
    else {
        for (let i = 0; i < password.length; i++) {
            let charValue = password.charCodeAt(i);
            if (isUpperCase(charValue))
                upperCase = true;
            else if (isDigit(charValue))
                digit = true;
            else if (isSpecialChar(charValue))
                specialChar = true;
        }

        if (!upperCase) {
            document.getElementById("passwordMsg").innerHTML = "sorry, your password must contain an uppercase letter";
            valid = false;
        }
        else if (!digit) {
            document.getElementById("passwordMsg").innerHTML = "sorry, your password must contain a digit";
            valid = false;
        }
        else if (!specialChar) {
            document.getElementById("passwordMsg").innerHTML = "sorry, your password must contain one of the following: / * - + ! @ # $ ^ & ~ [ ]";
            valid = false;
        }
    }

    if (!valid) {
        document.getElementById("passwordMsg").style.color = 'red';
        return false;
    }
    else {
        document.getElementById("passwordMsg").innerHTML = "password satisfies all requirements!";
        document.getElementById("passwordMsg").style.color = 'black';
        return true;
    }
}









