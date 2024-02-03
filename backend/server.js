const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer= require('multer')
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT | 4000
const pass = process.env.pass 

// MongoDB connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
    csvData: Array, // This will store the CSV data in JSON format
  });
  
  const Startup = mongoose.model('Startup', startupSchema);

// Middleware
app.use(bodyParser.json());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.get('/assignment/src/pages/InvesterDashboard', async (req, res) => {
    try {
      const startups = await Startup.find({}, 'companyName revenue businessDescription');
      res.status(200).json(startups);
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route for handling CSV file upload
app.post('/assignment/src/pages/StartupDashboard', upload.single('csvFile'), async (req, res) => {
    try {
      const { email, password } = req.body;
      const csvDataBuffer = req.file.buffer.toString(); // Convert buffer to string
      const jsonArray = await csvtojson().fromString(csvDataBuffer);
  
      // Find the startup with the provided email and password
      const startup = await Startup.findOne({ email, password });
  
      if (startup) {
        // Update the startup's csvData field with the parsed JSON array
        startup.csvData = jsonArray;
        await startup.save();
        res.status(200).json({ message: 'CSV file uploaded successfully' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

app.post('/assignment/src/components/StartupSignup', async (req, res) => {
    try {
      const { email, password, companyName, businessDescription, revenue } = req.body;
      const newStartup = new Startup({ email, password, companyName, businessDescription, revenue });
      await newStartup.save();
     
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {


      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// API route for signing up
app.post('/assignment/src/components/InvesterSignup', async (req, res) => {
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

app.post('/assignment/src/components/InvesterLogin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Invester.findOne({ email, password });
  
      if (user) {
        // Successful login
      
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

  app.post('/assignment/src/components/StartupLogin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Startup.findOne({ email, password });
  
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


