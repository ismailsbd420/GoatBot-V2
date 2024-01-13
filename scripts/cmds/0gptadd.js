const axios = require('axios');

module.exports = {
  config: {
    name: "gptadd",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    shortDescription: "Teach",
    longDescription: "This Command Allows You To Add a Question and Answer in Samir's GPT Server",
    category: "customization",
    guide: {
      en: "{p}{n} question | answer",
    }
  },

  onStart: async function ({ message, event, api }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply("Please enter in the format:\n!gptadd question | answer");
    }

    try {
      const [qna, ans] = info.split("|").map((item) => item.trim());
      const apiUrl = `https://api.samir-dev.repl.co/gpt/add?question=${qna}&answer=${ans}&apikey=noobsamirxyz`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        message.reply({
          body: response.data.message
        });
      } else {
        message.reply("Unexpected response from the API.");
      }
    } catch (error) {
      console.error(error);
      message.reply("Unexpected error occurred in API!");
    }
  }
};
