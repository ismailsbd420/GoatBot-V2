const axios = require('axios');

module.exports = {
  config: {
    name: "gptdelete",
    aliases: ['gptdel'],
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 2,
    shortDescription: "Delete a Question from Samir's GPT Server",
    longDescription: "This Command Allows You To Delete a Question from Samir's GPT Server",
    category: "customization",
    guide: {
      en: "{p}{n} question",
    }
  },

  onStart: async function ({ message, event, api }) {
    const questionToDelete = event.body.slice(event.body.indexOf(' ') + 1);
    if (!questionToDelete) {
      return message.reply("Please enter the question you want to delete.");
    }

    try {
      // Replace 'YOUR_API_KEY_HERE' with your actual API key
      const apiUrl = `https://api.samir-dev.repl.co/gpt/delete?question=${encodeURIComponent(questionToDelete)}&apikey=noobsamirxyz`;
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
      message.reply("An unexpected error occurred while deleting the question.");
    }
  }
};
