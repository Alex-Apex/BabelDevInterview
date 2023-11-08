const homeModel = require('../models/homeModel');

exports.index = async (req, res) => {
    stages = await homeModel.getInterviewStages();
    agentMsg = await homeModel.findAll();

    res.render('home', 
        {
            layout: 'main', // this is the default layout, but it's good to be explicit
            title: 'Welcome to BabelDev Interviewer',
            alerts: 'BabelDev Interviewer - By Apex', // content for the top bar
            sidebar: 'Your Interview Stages', 
            openAIMessage: agentMsg.message.content,
            interviewStages: stages
        }
    );
};
