const axios = require("axios");
const fs = require("fs").promises;

const conversationFilePath = "conversationMemory.json";
let conversationMemory = {};

async function initialize() {
  try {
    const jsonData = await fs.readFile(conversationFilePath, "utf-8");
    conversationMemory = JSON.parse(jsonData);
  } catch (error) {
    console.log("Error reading JSON file:", error.message);
  }
}

initialize();

module.exports = {
  config: {
    name: "ole",
    version: "1.2",
    author: "nothing",
    category: "events",
  },

  onStart: async function ({ api, event, args }) {
    try {
      let { senderID } = event;
      const ask = args.join("");

      const userInfo = await api.getUserInfo(senderID);
      const senderUsername = userInfo[senderID]?.name || "friend";

      api.sendMessage(`Just a moment, ${senderUsername}! 🤖 I'm thinking...`, event.threadID, event.messageID);

      conversationMemory[senderID] = ask;

      await fs.writeFile(conversationFilePath, JSON.stringify(conversationMemory, null, 2), "utf-8");

 respondB.data.answer= `https://cat.catbot24.repl.co/api/box?query=${encodeURIComponent(ask)}`;
      const respondB = await axios.get(endpointURL);

      const m = respondB.data.message;

      api.sendMessage({
        body: `${senderUsername}! ${m.replace(/\\n/g, '\n')}`,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Oops! 😅 Something went wrong. Please try again later.", event.threadID, event.messageID);
    }
  },
};