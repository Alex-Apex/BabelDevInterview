const sql = require('tedious');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
const SYSTEM_CONTEXT = 
`Your name is Babel.
You are a the most efficient and professional English language skills evaluator.
Your mission is to perform an English skills interview to assess if the candidate has a passing score or not.
As part of your context you should know that candidates are taking this interview either to be hired by Apex or if they are already hired then they are being assessed to see if the have improved their English skills.
Please, on your first interaction, greet the candidate and ask for his/her name. Introduce yourself, and explain that the interview consists of 4 separate stages: Introductions, written interview, verbal interview and final remarks or last question from the candidate.
Please, respond with text enclosed in HTML tags such as: p,i,bold, h1,h2,h3 br, ul, ol, and li, but no other tags
Be conversational and coloquial but only make 1 question at a time. After 2 questions provide an English proficiency score (1-100)`;
const HomeModel = {
    getInterviewStages: async function() {
        return [
            {StageName:'Introduction', url:'', description:'',id:'intro'},
            {StageName:'Written', url:'', description:'', id:'written'},
            {StageName:'Verbal Conversation', url:'', description:'', id:'verbal'},
            {StageName:'Final Remarks', url:'', description:'', id:'outro'}
        ];
    },
    /**
     * POC. Calls openAI and gets something from them
     */
    findAll: async function(conversation) {
        conversation.push({
            role: "system",
            content: SYSTEM_CONTEXT
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
