require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { engine, create } = require('express-handlebars');
const OpenAI = require('openai');
const homeRoutes = require('./routes/homeRoutes');
const aiInteractionRoutes = require('./routes/aiInteractionRoutes');

// Initialize Express
const app = express();

const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname:'handlebars',
});

// Initialize OpenAI with API Key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Set up Express Handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setting up the session variables (to keep msg conversations). TODO: Conversation persistance with db should be a better bet
app.use(
    session({
        secret: 'your_secret_key', // This is a secret key used to sign the session ID cookie
        resave: false, // Forces the session to be saved back to the session store
        saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Ensures cookies are only used over HTTPS
            maxAge: 1000 * 60 * 60 * 24 // Cookie expiration date, here it's set for one day
        }
    }));

// Static files directory
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/htmx.org/dist/'));

// Define routes
app.use('/', aiInteractionRoutes);
app.use('/', homeRoutes);

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
