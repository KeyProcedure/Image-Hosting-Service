const submitButton = document.getElementById('postSubmit');
submitButton.addEventListener('click', validatePost);

const titleInputField = document.getElementById('post-title');
titleInputField.addEventListener('keydown', function () {
  titleInputField.setCustomValidity('')
});

const descriptionInputField = document.getElementById('post-desc');
descriptionInputField.addEventListener('keydown', function () {
  descriptionInputField.setCustomValidity('')
});

function validatePost() {
  validateTitle();
  validateDescription();
}

function validateTitle() {
  let title = titleInputField.value;

  if (title.length < 1) {
    document.getElementById('post-title-msg').style.color = 'red';
    document.getElementById('post-title').style.borderColor = 'red';
    let errorMsg = 'The title cannot be blank'
    document.getElementById('post-title').setCustomValidity(errorMsg);
  } else {
    document.getElementById('post-title-msg').style.color = 'black';
    document.getElementById('post-title').style.borderColor = 'black';
  }
}

function validateDescription() {
  let description = descriptionInputField.value;

  if (description.length < 1) {
    document.getElementById('post-desc-msg').style.color = 'red';
    document.getElementById('post-desc').style.borderColor = 'red';
    let errorMsg = 'The description cannot be blank'
    document.getElementById('post-desc').setCustomValidity(errorMsg);
  } else {
    document.getElementById('post-desc-msg').style.color = 'black';
    document.getElementById('post-desc').style.borderColor = 'black';
  }
}