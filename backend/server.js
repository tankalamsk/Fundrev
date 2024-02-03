const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect("mongodb+srv://surya:surya@fundrev.wzsbagm.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Define Invester schema and model
const investerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Invester = mongoose.model('Invester', investerSchema);


const startupSchema = new mongoose.Schema({
    email: String,
    password: String,
    companyName: String,
    businessDescription: String,
    revenue: Number,
  });
  
  const Startup = mongoose.model('Startup', startupSchema);

// Middleware
app.use(bodyParser.json());

app.post('/assignment/src/components/StartupSignup.js', async (req, res) => {
    try {
      const { email, password, companyName, businessDescription, revenue } = req.body;
      const newStartup = new Startup({ email, password, companyName, businessDescription, revenue });
      await newStartup.save();
      console.log(
        "account created"
    )
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {

    console.log("error")
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// API route for signing up
app.post('/assignment/src/components/InvesterSignup.js', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newInvester = new Invester({ email, password });
    await newInvester.save();
   
    res.status(201).send('Account created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/assignment/src/components/InvesterLogin.js', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Invester.findOne({ email, password });
  
      if (user) {
        // Successful login
        console.log("yes")
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Incorrect credentials
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


