const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Initialize OpenAI with API Key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Set up Express Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/htmx.org/dist/'));

// Define routes
app.get('/', (req, res) => {
    res.render('home', {
        layout: 'main', // this is the default layout, but it's good to be explicit
        title: 'Welcome to BabelDev Interviewer',
        alerts: 'BabelDev Interviewer - By Apex', // content for the top bar
        sidebar: 'This is the sidebar content' // content for the sidebar
    });
});


// Sample route for the interview API
app.post('/interview', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003", // or your preferred model
            prompt: prompt,
            max_tokens: 150
        });

        return res.json(response.data);
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return res.status(500).send('Error processing the interview');
    }
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

// Set the port the server will listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
