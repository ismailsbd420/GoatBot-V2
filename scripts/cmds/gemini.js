const axios = require("axios");

module.exports = {
  config: {
    name: "gemini",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 0,
    category: "google"
  },
  onStart: async function({ message, event, args, commandName }) {
    const text = args.join(' ');

    try {
      const response = await axios.get(`https://sandipapi.onrender.com/gemini?prompt=${encodeURIComponent(text)}`);

      if (response.data.answer) {
        const textContent = response.data.answer;
        const ans = `${textContent}`;
        message.reply({
          body: ans,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } 

    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID != author) return;
    const gif = args.join(' ');
    const url = args.join[1]

    try {
      const response = await axios.get(`https://sandipapi.onrender.com/gemini2?prompt=${encodeURIComponent(gif)}&url=${url}`);

      if (response.data) {
        const textContent = response.data.answer;
        const wh = `${textContent}`;
        message.reply({
          body: wh,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } 

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
