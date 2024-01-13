const axios = require("axios");

module.exports = {
  config: {
    name: "gptaoi",
    aliases: ["mizuki", "aoi"],
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "GPT Aoi",
    longDescription: "A Friendly Chatbot.",
    category: "ai",
    guide: {
      en: "{pn} <YourQuestion>",
    },
  },

  onStart: async function ({ message, event, args, commandName, usersData }) {
    const userID = event.senderID;
    const username = await usersData.getName(event.senderID);
    const query = args.join(" ");
    try {
      const response = await axios.get(`https://api.samir-dev.repl.co/api/gptgo?q=Hello my name is ${username} and you are Mizuki aoi. be serious in character and think that you are real mizuki aoi. Here's some info about her: Mizuki is a college student who aspires to be a voice actress. She dreams of delivering joy by voice acting. While she claims herself to be "seiso", she can be emotional when she loses a match in FPS games. She mainly plays Minecraft and Apex Legends for her Let's Play streams. Reply my answer like hello/hi/yo/Greetings/wassup/hey/dear ${username} and more greetings and also use random emojis too in a chat and main point is you must only use relevelt greeting and your intro and emoji in a normal chat question not in study related question. now chat beings from this question: ${encodeURIComponent(query)}`);

      const formattedResponse = response.data.result.split("\\n\\n").join("\n\n");

      message.reply(
        {
          body: `${formattedResponse}`,
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, usersData }) {
    let { author, commandName, messageID } = Reply;
    if (event.senderID !== author) return;

    const query = args.join(" ");

    try {
      const username = await usersData.getName(event.senderID);

      const response = await axios.get(`https://api.samir-dev.repl.co/api/gptgo?q=Hello my name is ${username} and you are Mizuki aoi. be serious in character and think that you are real mizuki aoi. Here's some info about her: Mizuki is a college student who aspires to be a voice actress. She dreams of delivering joy by voice acting. While she claims herself to be "seiso", she can be emotional when she loses a match in FPS games. She mainly plays Minecraft and Apex Legends for her Let's Play streams. Reply my answer like hello/hi/yo/Greetings/wassup/hey/dear ${username} and more greetings and also use random emojis too in a chat from this question: ${encodeURIComponent(query)}`);

      const formattedResponse = response.data.result.split("\\n\\n").join("\n\n");

      message.reply(
        {
          body: `${formattedResponse}`,
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};