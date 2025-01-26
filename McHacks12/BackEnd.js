const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve Home.html for GET requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, age, medicalCondition } = req.body;

    // Check if medicalCondition is properly received
    console.log('Form data received:', { name, age, medicalCondition });

    // Create a new submission string in the desired format: name;age;medicalCondition
    const submissionString = `${name};${age};${medicalCondition}\n`; // Add newline for separation

    // Append the submission to the database.txt file
    fs.appendFile('database.txt', submissionString, (err) => {


        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Server error. Please try again later.');
        }

        
        // Redirect to the 'Submitted.html' page after successful submission
        res.redirect('/submitted');
    });
});

// Serve the Submitted.html page for GET requests to '/submitted'
app.get('/submitted', (req, res) => {
   
    res.sendFile(path.join(__dirname, 'public', 'Submitted.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
