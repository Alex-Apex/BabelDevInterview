const AIModel = require('../models/aiModel'); // Your AI model that handles interaction with OpenAI

exports.submitAnswer = async (req, res) => {
    const userAnswer = req.body.userInput;
    try {
        // Process the user's answer and get the next question
        const response = await AIModel.processAnswerAndGetNextQuestion(userAnswer);

        // Send back the part of the page to be updated (the #ai-response div)
        res.render('partials/aiResponse', {
            englishQuestion: response.nextQuestion,
            previousAnswer: userAnswer
        });
    } catch (error) {
        console.error('Error during AI interaction:', error);
        res.status(500).send('An error occurred');
    }
};
