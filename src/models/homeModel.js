const sql = require('tedious');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

const HomeModel = {
    getInterviewStages: async function() {
        return [
            {StageName:'Introduction', url:'', description:''},
            {StageName:'Written', url:'', description:''},
            {StageName:'Verbal Conversation', url:'', description:''},
            {StageName:'Final Remarks', url:'', description:''}
        ];
    },
    /**
     * POC. Calls openAI and gets something from them
     */
    findAll: async function(conversation) {
        conversation.push({
            role: "system",
            content: "You are a professional English language evaluator.Please, welcome the candidate to BabelDev AI Interviewer App by Apex for his English interview. please respond with HTML formatted text but only use: p,i,bold, headers,etc. Be conversational but only make 1 question at a time. After 2 questions provide an English proficiency score (1-100)" 
        });
        try{
            const completion = await openai.chat.completions.create({
                messages: conversation,
                model: "gpt-4-1106-preview",
            });          
            return completion.choices[0];
        } catch (error){
            console.error("Error while calling OpenAI:". error);
            throw error;
        }
    },
    // Other data operations...
};

module.exports = HomeModel;
