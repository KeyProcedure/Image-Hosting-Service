const submitButton = document.getElementById('registrationSubmit');
submitButton.addEventListener('click', validateRegistration);

const usernameInputField = document.getElementById('username');
usernameInputField.addEventListener('keydown', function () {
  usernameInputField.setCustomValidity('')
});

const passwordInputField = document.getElementById('password');
passwordInputField.addEventListener('keydown', function () {
  passwordInputField.setCustomValidity('')
});

const confirmPasswordInputField = document.getElementById('confirmPassword');
confirmPasswordInputField.addEventListener('keydown', function () {
  confirmPasswordInputField.setCustomValidity('')
});

function validateRegistration() {
  validateUsername();
  validateEmail();
  validatePassword();
}

function validateUsername() {
  let username = usernameInputField.value;
  let usernameMsg = document.getElementById('usernameMsg');
  let firstChar = username.charCodeAt(0);
  let valid = true;

  if (username.length < 3) {
    let errorMsg = 'Your username must be at least 3 characters long'
    usernameMsg.innerHTML = errorMsg;
    usernameInputField.setCustomValidity(errorMsg);
    valid = false;
  } else if (!isLowerCaseChar(firstChar) && !isUpperCaseChar(firstChar)) {
    let errorMsg = 'Your username must begin with an alphabetical character';
    usernameMsg.innerHTML = errorMsg;
    usernameInputField.setCustomValidity(errorMsg);
    valid = false;
  } else {
    for (let i = 1; i < username.length; i++) {
      let charValue = username.charCodeAt(i);
      if (!isLowerCaseChar(charValue) && !isUpperCaseChar(charValue) && !isDigit(charValue)) {
        let errorMsg = 'Your username must consist of only letters and numbers'
        usernameMsg.innerHTML = errorMsg;
        usernameInputField.setCustomValidity(errorMsg);
        valid = false;
        break;
      }
    }
  }

  if (valid) {
    usernameMsg.innerHTML = 'Username satisfies all requirements';
    usernameMsg.style.color = 'black';
    usernameInputField.style.borderColor = 'black';
  } else {
    usernameMsg.style.color = 'red';
    usernameInputField.style.borderColor = 'red';
  }
}

function validateEmail() {
  let email = document.getElementById('email');
  let emailMsg = document.getElementById('emailMsg');

  if (!email.validity.valid) {
    email.style.borderColor = 'red';
    emailMsg.style.color = 'red';
    emailMsg.innerHTML = 'Email must be valid'
  } else {
    email.style.borderColor = 'black';
    emailMsg.style.color = 'black';
    emailMsg.innerHTML = 'Your email satisfies all requirements'
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
    let errorMsg = 'Your password must be at least 8 characters long'
    passwordMsg.innerHTML = errorMsg;
    password.setCustomValidity(errorMsg);
    valid = false;
  } else {
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
      let errorMsg = 'Your password must contain an uppercase letter';
      passwordMsg.innerHTML = errorMsg;
      password.setCustomValidity(errorMsg);
      valid = false;
    } else if (!digit) {
      let errorMsg = 'Your password must contain a digit';
      passwordMsg.innerHTML = errorMsg;
      password.setCustomValidity(errorMsg);
      valid = false;
    } else if (!specialChar) {
      let errorMsg = 'Your password must contain one of the following: ' +
        '/ * - + ! @ # $ ^ & ~ [ ]';
      passwordMsg.innerHTML = errorMsg;
      password.setCustomValidity(errorMsg);
      valid = false;
    }
  }

  if (valid) {
    passwordMsg.innerHTML = 'Password satisfies all requirements';
    passwordMsg.style.color = 'black';
    password.style.borderColor = 'black';
    validateConfirmPassword();
  } else {
    passwordMsg.style.color = 'red';
    password.style.borderColor = 'red';
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
    return true;
  } else {
    let errorMsg = 'Passwords don\'t match, try again';
    confirmPasswordMsg.innerHTML = errorMsg;
    confirmPassword.setCustomValidity(errorMsg);
    confirmPasswordMsg.style.color = 'red';
    confirmPassword.value = "";
    confirmPassword.style.borderColor = 'red';
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