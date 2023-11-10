const AIModel = require('../models/aiModel'); // Your AI model that handles interaction with OpenAI

const USER_ROLE = 'user';
const SYSTEM_ROLE = 'assistant';

exports.submitAnswer = async (req, res) => {
    const userAnswer = req.body.userInput;

    if(!req.session.interviewConversationHistory) {
        req.session.interviewConversationHistory = [];
    }
    const userMsg = {
        role:USER_ROLE,
        content:userAnswer
    };
    req.session.interviewConversationHistory.push(userMsg);

    try {
        // Process the user's answer and get the next question
        const response = await AIModel.getAIResponse(req.session.interviewConversationHistory);
        req.session.interviewConversationHistory.push({
            role: SYSTEM_ROLE,
            content:response
        });
        // Send back the part of the page to be updated (the #ai-response div)
        res.render('partials/aiResponseView', 
        {
            layout: false,
            openAIMessage: response,            
            previousAnswer: userAnswer
        });
    } catch (error) {
        console.error('Error during AI interaction:', error);
        res.status(500).send('An error occurred');
    }
};
