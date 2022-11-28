const submitButton = document.getElementById('loginSubmit');
submitButton.addEventListener('click', validateLogin);

const passwordInputField = document.getElementById('login-username');
passwordInputField.addEventListener('keydown', function () {
  passwordInputField.setCustomValidity('')
});

const confirmPasswordInputField = document.getElementById('login-password');
confirmPasswordInputField.addEventListener('keydown', function () {
  confirmPasswordInputField.setCustomValidity('')
});

function validateLogin() {
  validateUsername();
  validatePassword();
}

function validateUsername() {
  let username = document.getElementById('login-username').value;

  if (username.length < 1) {
    document.getElementById('login-username-msg').style.color = 'red';
    document.getElementById('login-username').style.borderColor = 'red';
    let errorMsg = 'Your username cannot be blank'
    document.getElementById('login-username').setCustomValidity(errorMsg);
  } else {
    document.getElementById('login-username-msg').style.color = 'black';
    document.getElementById('login-username').style.borderColor = 'black';
  }
}

function validatePassword() {
  let password = document.getElementById('login-password').value;

  if (password.length < 1) {
    document.getElementById('login-password-msg').style.color = 'red';
    document.getElementById('login-password').style.borderColor = 'red';
    let errorMsg = 'Your password cannot be blank'
    document.getElementById('login-password').setCustomValidity(errorMsg);
  } else {
    document.getElementById('login-password-msg').style.color = 'black';
    document.getElementById('login-password').style.borderColor = 'black';
  }
}