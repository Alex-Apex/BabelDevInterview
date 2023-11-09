// src/models/aiModel.js

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getAIResponse = async (userInput) => {
    // Call the OpenAI API with the user's input
    // Return the AI's response
};
