// Function to handle form submission
    document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        // Perform validation if needed

        // Send form data to server
        try {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (confirm('Thank you for your feedback! Click OK to return to the homepage.')) {
                    window.location.href = 'profile.html'; // Redirect to index.html
                }
            } else {
                alert('Feedback submission failed. Please try again.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
