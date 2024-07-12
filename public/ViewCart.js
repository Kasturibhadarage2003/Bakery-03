 // Function to retrieve cart items from localStorage and display in cart
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        // Retrieve cart items from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear previous items in the cart
        cartItemsContainer.innerHTML = '';

        // Calculate total price
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update total price display
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to update total when additional charge is applied
    function updateTotal() {
        const packingCheckbox = document.getElementById('packing');
        const cartTotalElement = document.getElementById('cart-total');

        // Retrieve cart items from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Calculate total price
        let total = 0;
        cart.forEach(item => {
            total += item.price;
        });

        // Add packing charge if checkbox is checked
        if (packingCheckbox.checked) {
            total += 5.00;
        }

        // Update total price display
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to show total price when button is clicked
    function showTotal() {
        const cartTotalElement = document.getElementById('cart-total');
        cartTotalElement.style.display = 'block';
        updateTotal(); // Update the total when showing it
    }

    function redirectToPayment() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const packingCheckbox = document.getElementById('packing');
        let additionalCharge = packingCheckbox.checked ? 5.00 : 0;
        let total = 0;
        cart.forEach(item => {
            total += item.price;
        });
        total += additionalCharge;

        // Retrieve the user ID from local storage
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert("User ID not found. Please log in again.");
            return;
        }

        const orderDetails = {
            userId: userId,
            items: cart,
            additionalCharge: additionalCharge,
            total: total
        };

        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        }).then(response => {
            if (response.ok) {
                localStorage.removeItem('cart'); // Clear the cart after successful payment
                window.location.href = 'payment.html'; // Redirect to thank you page
            } else {
                console.error('Failed to place order');
                // Handle failure to place order, display error message, etc.
            }
        }).catch(error => {
            console.error('Error:', error);
            // Handle network errors, display error message to user, etc.
        });
    }

    // Function to clear cart items
    function clearCart() {
        localStorage.removeItem('cart');
        displayCartItems();
        updateTotal();
    }

    // Display cart items on page load
    displayCartItems();