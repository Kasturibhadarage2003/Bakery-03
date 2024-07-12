document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const responseData = await response.json();
            alert('User registered successfully');
            window.location.href = 'index.html'; // Redirect to profile page after successful registration
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });