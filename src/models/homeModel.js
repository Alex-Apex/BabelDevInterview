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
    findAll: async function(userMsg) {
        try{
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "Please, welcome the Candidate to BabelDev AI Interviewer App for his English interview. Also please respond with HTML formatted text but only use: p,i,bold, headers,etc" 
                    }
                ],
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
