const CreateUser = document.querySelector('.CreateUser');
const LoginUser = document.querySelector('.LoginUser');

CreateUser.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = CreateUser.querySelector('.username').value;
  const password = CreateUser.querySelector('.password').value;
  post('/createUser', { username, password })
    .then(response => {
      if (response.ok) {
        alert('User created successfully');
      } else {
        alert('Error creating user');
      }
    });
});

LoginUser.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = LoginUser.querySelector('.username').value;
  const password = LoginUser.querySelector('.password').value;
  post('/login', { username, password })
    .then(response => {
      if (response.ok) {
        alert('Login successful');
        // Optionally, redirect to another page or perform further actions
      } else {
        alert('Invalid username or password');
      }
    });
});

function post(path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const createUserForm = document.querySelector('.CreateUser');
  const loginUserForm = document.querySelector('.LoginUser');
  const logoutForm = document.querySelector('.Logout');
  const logoutButton = document.querySelector('.logout-button');

  createUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Add logic to create a new user
  });

  loginUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Add logic to handle login
    // On successful login, show the logout button and hide login/create forms
    createUserForm.style.display = 'none';
    loginUserForm.style.display = 'none';
    logoutForm.style.display = 'block';
  });

  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Add logic to handle logout
    // On successful logout, show the login/create forms and hide the logout button
    createUserForm.style.display = 'block';
    loginUserForm.style.display = 'block';
    logoutForm.style.display = 'none';
  });
});

document.querySelector('.LoginUser').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  const role = document.querySelector('.LoginUser select').value;
  if (role === 'lecturer') {
    alert('Welcome, Lecturer!');
  } else {
    alert('Welcome, Student!');
  }
});