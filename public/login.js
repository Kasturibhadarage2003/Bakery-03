 document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userId', data.user._id); // Store user ID separately
          alert('Login successful, redirecting to profile.');
          window.location.href = 'profile.html';
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      });
  });