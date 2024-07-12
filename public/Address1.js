// Redirect to hellouser.html to fill in the address
    document.getElementById('fillAddress').addEventListener('click', function() {
        window.location.href = 'hellouser.html';
    });

    // Simulate using the saved address
    document.getElementById('useSavedAddress').addEventListener('click', function() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('No user data found. Please log in.');
            window.location.href = 'login.html';
            return;
        }

        // Assuming user.address contains the saved address information
        if (user.address) {
            alert('Using saved address: ' + JSON.stringify(user.address));
            // Proceed to the next step or page after using the saved address
            // For example:
            // window.location.href = 'nextStep.html';
        } else {
            alert('No saved address found. Please fill in your address.');
            window.location.href = 'hellouser.html';
        }
    });