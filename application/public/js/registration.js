const button = document.getElementById("registrationSubmit");
button.addEventListener('click', validateRegistration);

function validateRegistration() {
    return validateUsername();
}

function validateUsername() {
    let userName = document.getElementById("username").value;
    let firstChar = userName.charCodeAt(0);

    if (userName.length < 3) {
        document.getElementById("usernameError").innerHTML = "sorry, your username must be at least 3 characters long";
        document.getElementById("usernameError").style.color = 'red';
        return false;
    }
    else if (!isAlphabetical(firstChar)) {
        document.getElementById("usernameError").innerHTML = "sorry, your username must begin with an alphabetical character";
        document.getElementById("usernameError").style.color = 'red';
        return false;
    }
    else {
        for (let i = 1; i < userName.length; i++) {
            let charValue = userName.charCodeAt(i);
            if (!isAlphabetical(charValue) && !isDigit(charValue)) {
                document.getElementById("usernameError").innerHTML = "sorry, your username must consist of only letters and numbers";
                document.getElementById("usernameError").style.color = 'red';
                return false;
            }
        }
    }

    return true;
}

function isAlphabetical(charValue) {
    return (charValue >= 65 && charValue <= 90) || (charValue >= 97 && charValue <= 122);
}

function isDigit(charValue) {
    return charValue >= 48 && charValue <= 57;
}