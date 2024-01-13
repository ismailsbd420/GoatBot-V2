const axios = require('axios');

module.exports = {
    config: {
        name: "aisim",
        version: "1.0",
        author: "Samir",
        shortDescription: "Ask a question to GPT-3.5.",
        longDescription: "Ask a question to GPT-3.5 using the provided API.",
        category: "ai",
        guide: { en:"{pn} [question]" },
    },
  
    onStart: async function ({ message, args, getLang }) {
        const question = args.join(" ");
        if (!question) {
            return message.reply("Please provide a question to ask GPT.");
        } else {
            try {
                const response = await axios.get(`https://api.samir-dev.repl.co/gpt/ask?q=${encodeURIComponent(question)}`);
                const gptAnswer = response.data.answer;

                
                message.reply(gptAnswer);
            } catch (e) {
                console.error(e); 
                message.reply("Error while fetching the GPT response.");
            }
        }
    }
};