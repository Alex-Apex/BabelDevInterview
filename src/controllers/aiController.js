// src/controllers/aiController.js

const AIModel = require('../models/aiModel'); // This would be your model that interacts with OpenAI

exports.interactWithAI = async (req, res) => {
    try {
        const userInput = req.body.userInput;
        const aiResponse = await AIModel.getAIResponse(userInput);

        // Render a view with the AI response or handle the response as needed
        res.render('aiResponseView', {
            userMessage: userInput,
            aiMessage: aiResponse
        });
    } catch (error) {
        console.error('Error interacting with AI:', error);
        res.status(500).send('An error occurred during the interaction with the AI');
    }
};
