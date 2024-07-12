const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Payment = require('./models/payment');
const Feedback = require('./models/feedback');
const User = require('./models/user'); // Fixed path
const Address = require('./models/address'); // Fixed path
const Order = require('./models/order'); // Ensure the path is correct
const Contact = require('./models/contact'); // Import Contact model


const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve static files
app.use(express.static('public'));


app.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});
app.post('/save-address', async (req, res) => {
  try {
    const { userId, street, city, state, zip } = req.body;
    console.log('Received request body:', req.body);  // Add this line to log the received body

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');  // Add this line to log if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Create or update user's address
    let address = await Address.findOne({ user: userId });
    if (!address) {
      address = new Address({ user: userId, street, city, state, zip });
    } else {
      address.street = street;
      address.city = city;
      address.state = state;
      address.zip = zip;
    }

    await address.save();

    // Update user's address reference
    user.address = address._id;
    await user.save();

    res.status(200).json({ message: 'Address saved successfully' });
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Send user data (including user ID) to the client
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      orders: user.orders,
    };

    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Payment route
app.post('/payment', async (req, res) => {
    try {
        const { userId, paymentMethod, cardNumber, cardName, expiryDate, cvv } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required to process payment' });
        }

        // Validate userId format (optional)
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new Payment document
        const payment = new Payment({
            userId,
            paymentMethod,
            cardNumber,
            cardName,
            expiryDate,
            cvv,
        });

        // Save the payment
        await payment.save();

        res.status(200).send('Payment successful');
    } catch (error) {
        res.status(500).send('Error processing payment: ' + error.message);
    }
});
app.post('/feedback', async (req, res) => {
  try {
    const feedbackData = req.body;
    const feedback = new Feedback(feedbackData);
    await feedback.save();
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    res.status(500).send('Error saving feedback: ' + error.message);
  }
});

// Handle POST request to create a new order
app.post('/order', async (req, res) => {
    try {
        const { userId, items, additionalCharge, total } = req.body;
        console.log('Received order details:', req.body);  // Log received order details

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required to place an order' });
        }

        // Retrieve user details
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new Order document
        const newOrder = new Order({
            userId: userId,
            items: items,
            additionalCharge: additionalCharge,
            total: total
        });

        // Save the order
        const savedOrder = await newOrder.save();

        // Optionally, you can update user's order history or perform other actions

        res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});

// Fetch Orders
app.get('/orders/:userId', async (req, res) => {
    try {
        console.log(`Fetching orders for user: ${req.params.userId}`);
        const orders = await Order.find({ userId: req.params.userId });
        console.log(`Fetched orders: ${orders}`);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Contact form submission
app.post('/submit_contact_form', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        res.status(500).send('Error submitting form: ' + error.message);
    }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
