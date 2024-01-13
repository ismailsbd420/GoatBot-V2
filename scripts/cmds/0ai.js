const axios = require("axios");

const apiUrl = "https://sandipapi.onrender.com/api/ai?query=";

module.exports = {
//THIS COMMAND DOESNT NEED OPENAI KEY
  
  config: {
    name: "ai",
    aliases: ["ai","gpt"],
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "get a response/answers from chatGPT"
    },
    longDescription: {
      en: "get response/answers chatGPT"
    },
    category: "ai"
  },

  onStart: async function ({ message, event, args, commandName }) {
    const prompt = args.join(" ");

    if (!prompt) {
      message.reply("Please provide a prompt.");
      return;
    }

    try {
      const queryUrl = apiUrl + encodeURIComponent(prompt);
      const response = await axios.get(queryUrl);
      const result = response.data;

      const content = result.answer;

      const replyOptions = {
        body: content
      };

      message.reply(replyOptions, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};