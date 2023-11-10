const homeModel = require('../models/homeModel');

exports.index = async (req, res) => {
    if(!req.session.interviewConversationHistory) {
        req.session.interviewConversationHistory = [];
    }

    stages = await homeModel.getInterviewStages();
    agentMsg = await homeModel.findAll(req.session.interviewConversationHistory);

    res.render('home', 
        {
            layout: 'main', // this is the default layout, but it's good to be explicit
            title: 'Welcome to BabelDev Interviewer',
            alerts: 'BabelDev AI-Interviewer. By: Apex Systems', // content for the top bar
            sidebar: 'Your Interview Stages', 
            openAIMessage: agentMsg.message.content,
            interviewStages: stages
        }
    );
};
