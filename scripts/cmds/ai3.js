const axios = require('axios');

module.exports = {
    config: {
        name: "ai3",
        version: "1.0",
        author: "Samir",
        shortDescription: "Ask a question to GPT-3.5.",
        longDescription: "Ask a question to GPT-3.5 using the provided API.",
        category: "ai",
        guide: { en:"{pn} [question]" },
    },

  langs: {
    vi: {
      addUsage: 'Sử dụng: samir add YourQuestionHere => YourAnswerHere',
      updateUsage: 'Sử dụng: samir update ExistingQuestion => NewAnswerHere',
      deleteUsage: 'Sử dụng: samir delete YourQuestionHere',
    },
    en: {
      addUsage: 'Usage: samir add YourQuestionHere => YourAnswerHere',
      updateUsage: 'Usage: samir update ExistingQuestion => NewAnswerHere',
      deleteUsage: 'Usage: samir delete YourQuestionHere',
    },
  },

    onStart: async function ({ message, args, getLang }) {
        const question = args.join(" ");
        if (!question) {
            return message.reply("Please provide a question to ask GPT.");
        } else {
            try {
                const response = await axios.get(`https://gpt-35-turbo.samir-dev.repl.co/ask?q=${encodeURIComponent(question)}`);
                const gptAnswer = response.data.answer;

                
                message.reply(gptAnswer);
              const command = args[0].toLowerCase();
              switch (command) {
        case 'add':
        case 'update':
          if (args.length < 3) {
            return message.reply(getLang(`${command}Usage`));
          }

          const [question, answer] = args.slice(1).join(' ').split(' => ');
          const apiEndpoint = command === 'add' ? 'add' : 'update';

          const apiURL = `https://gpt-35-turbo.samir-dev.repl.co/${apiEndpoint}?question=${encodeURIComponent(
            question
          )}&answer=${encodeURIComponent(answer)}&apikey=97699`;

          const response = await axios[command === 'add' ? 'post' : 'put'](apiURL);
          return message.reply(response.data.message);

        case 'delete':
          if (args.length < 2) {
            return message.reply(getLang('deleteUsage'));
          }

          const questionToDelete = args[1];
          const deleteApiURL = `https://gpt-35-turbo.samir-dev.repl.co/delete?question=${encodeURIComponent(
            questionToDelete
          )}&apikey=97699`;

          const deleteResponse = await axios.delete(deleteApiURL);
          return message.reply(deleteResponse.data.message);
      }
            } catch (e) {
                console.error(e); 
                message.reply("Error while fetching the GPT response.");
            }
        }
    }
};