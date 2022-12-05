const submitButton = document.getElementById('loginSubmit');
submitButton.addEventListener('click', validateLogin);

const loginInputField = document.getElementById('login-username');
loginInputField.addEventListener('keydown', function () {
  loginInputField.setCustomValidity('')
});

const passwordInputField = document.getElementById('login-password');
passwordInputField.addEventListener('keydown', function () {
  passwordInputField.setCustomValidity('')
});

function validateLogin() {
  validateUsername();
  validatePassword();
}

function validateUsername() {
  let username = loginInputField.value;

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
  let password = passwordInputField.value;

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