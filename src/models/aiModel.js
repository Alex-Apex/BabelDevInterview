const OpenAI = require('openai');

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});


/**
 *Call the OpenAI API with the user's input
 * Return the AI's response
 * @param {*} userMessage
 */
exports.getAIResponse = async (conversation) => {
  
  
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages:conversation
    });
    return completion.choices[0].message.content;    
  } catch(exception) {
    console.error('Failed to interact with AI', exception);
  } finally{
    //Store the messages?
  }

};
