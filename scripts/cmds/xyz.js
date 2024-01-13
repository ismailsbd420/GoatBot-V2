const axios = require('axios');

module.exports = {
  config: {
    name: "xyz",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    category: "customization",
    guide: {
      en: "{p}{n} add|delete|update question | [answer]",
    }
  },

  onStart: async function ({ message, event, api }) {
    const commandArgs = event.body.split(' ');
    const action = commandArgs[1];

    if (!action) {
        return message.reply("Please provide a valid action (add, delete, update).");
    }

    const questionAndAnswer = commandArgs.slice(2).join(' ');
    const [qna, ans] = questionAndAnswer.split("|").map((item) => item.trim());

    if (!qna && (action === 'add' || action === 'update')) {
      return message.reply("Please provide a question and answer for the 'add' or 'update' action.");
    }

    try {
      let apiUrl;
      let responseMessage;

      if (action === "add") {
        apiUrl = `https://api.samir-dev.repl.co/gpt/add?question=${qna}&answer=${ans}&apikey=noobsamirxyz`;
        responseMessage = "Question and answer added successfully.";
      } else if (action === "delete") {
        apiUrl = `https://api.samir-dev.repl.co/gpt/delete?question=${encodeURIComponent(qna)}&apikey=noobsamirxyz`;
        responseMessage = "Question deleted successfully.";
      } else if (action === "update") {
        apiUrl = `https://api.samir-dev.repl.co/gpt/update?question=${qna}&answer=${ans}&apikey=noobsamirxyz`;
        responseMessage = "Question and answer updated successfully.";
      } else {
        // Assuming this is the fallback when no valid action is found, triggering GPT response.
        try {
          const response = await axios.get(`https://api.samir-dev.repl.co/gpt/ask?q=${encodeURIComponent(commandArgs.slice(1).join(' '))}`);
          const gptAnswer = response.data.answer;
          message.reply(gptAnswer);
        } catch (e) {
          console.error(e);
          message.reply("Error while fetching the GPT response.");
        }
        return; // exit the function after GPT response
      }

      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        message.reply({
          body: responseMessage
        });
      } else {
        message.reply("Unexpected response from the API.");
      }
    } catch (error) {
      console.error(error);
      message.reply("An unexpected error occurred in the API!");
    }
  }
};
