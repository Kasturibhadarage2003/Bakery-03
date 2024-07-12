 // Function to toggle display of card details based on payment method selection
    function toggleCardDetails() {
        const paymentMethod = document.getElementById('paymentMethod').value;
        const cardDetails = document.getElementById('cardDetails');

        if (paymentMethod === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    }

    // Function to validate the form data
    function validateForm() {
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;

            let isValid = true;

            // Validate card number
            if (!cardNumber.match(/^\d{16}$/)) {
                document.getElementById('cardNumberError').textContent = 'Please enter a valid 16-digit card number.';
                isValid = false;
            } else {
                document.getElementById('cardNumberError').textContent = '';
            }

            // Validate cardholder name
            if (cardName.trim() === '') {
                document.getElementById('cardNameError').textContent = 'Please enter the cardholder name.';
                isValid = false;
            } else {
                document.getElementById('cardNameError').textContent = '';
            }

            // Validate expiry date
            if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
                document.getElementById('expiryDateError').textContent = 'Please enter a valid expiry date (MM/YY).';
                isValid = false;
            } else {
                document.getElementById('expiryDateError').textContent = '';
            }

            // Validate CVV
            if (!cvv.match(/^\d{3}$/)) {
                document.getElementById('cvvError').textContent = 'Please enter a valid 3-digit CVV.';
                isValid = false;
            } else {
                document.getElementById('cvvError').textContent = '';
            }

            return isValid;
        }
        return true;
    }

    // Function to submit the payment form data
    async function submitPayment(paymentData) {
        try {
            const response = await fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert('Payment successful! Proceeding to feedback.');
                window.location.href = 'feedback.html';
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    // Function to handle form submission
    async function handleFormSubmission(event) {
        event.preventDefault(); // Prevent form submission

        if (validateForm()) {
            const paymentMethod = document.getElementById('paymentMethod').value;
            const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

            if (!userId) {
                alert('User ID not found. Please log in again.');
                return;
            }

            if (paymentMethod === 'card') {
                const paymentData = {
                    userId, // Include user ID in payment data
                    paymentMethod,
                    cardNumber: document.getElementById('cardNumber').value,
                    cardName: document.getElementById('cardName').value,
                    expiryDate: document.getElementById('expiryDate').value,
                    cvv: document.getElementById('cvv').value,
                };
                await submitPayment(paymentData);
            } else if (paymentMethod === 'cash') {
                alert('Cash payment received! Proceeding to feedback.');
                window.location.href = 'feedback.html';
            }
        }
    }

    // Attach event listener to form submission
    document.getElementById('paymentForm').addEventListener('submit', handleFormSubmission);
