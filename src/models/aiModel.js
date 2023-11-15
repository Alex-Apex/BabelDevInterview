const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

const aiSpeechFile = path.join(__dirname,'../../public/speech/speech.mp3');//TODO:this might need an ID per user's session
console.log('url: ',aiSpeechFile);
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

exports.getAISpeech = async (aiText) => {
  const mp3 = await openai.audio.speech.create({
    model:"tts-1",
    voice:"shimmer",
    input:aiText,
  });
  
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(aiSpeechFile, buffer);
  return aiSpeechFile;  
};
