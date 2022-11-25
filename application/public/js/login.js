const submitButton = document.getElementById('loginSubmit');
submitButton.addEventListener('click', validateLogin);

function validateLogin() {
  validateUsername();
  validatePassword();
}

function validateUsername() {
  let username = document.getElementById('login-username').value;

  if (username.length < 1) {
    document.getElementById('login-username-msg').style.color = 'red';
    document.getElementById('login-username').style.borderColor = 'red';
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
  } else {
    document.getElementById('login-password-msg').style.color = 'black';
    document.getElementById('login-password').style.borderColor = 'black';
  }
}