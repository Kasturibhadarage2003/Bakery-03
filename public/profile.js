// Function to logout user and clear localStorage
    function logout() {
        localStorage.removeItem('user');
        window.location.href = 'login.html'; // Redirect to login page after logout
    }

     // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Display user details if available
    if (user) {
        document.getElementById('userButton').textContent = `Hello! ${user.name}`; // Display user's name on the button
    } else {
        alert('No user data found. Please log in.');
        window.location.href = 'login.html'; // Redirect to login page if no user data found
    }