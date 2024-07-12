
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Display user details if available
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userPhone').textContent = user.phone;
    } else {
        alert('No user data found. Please log in.');
        window.location.href = 'login.html'; // Redirect to login page if no user data found
    }

    // Function to save address
    function saveAddress() {
        const userId = user ? user._id : null;  // Ensure this line correctly retrieves user._id
        if (!userId) {
            alert('User ID not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }

        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;

        fetch('/save-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, street, city, state, zip })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Address saved successfully');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }