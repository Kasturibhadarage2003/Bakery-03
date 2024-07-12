 // Function to add item to cart
    function addToCart(itemName, itemPrice) {
        // Retrieve existing cart items from localStorage or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add new item to cart
        cart.push({ name: itemName, price: itemPrice });

        // Store updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show popup message
        alert(`${itemName} added to cart!`);
    }