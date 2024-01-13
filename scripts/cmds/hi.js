const fs = require('fs');

module.exports = {
  config: {
    name: "menyapa",
    version: "1.0",
    author: "Raphael ilom",
    countDown: 5,
    role: 0,
    shortDescription: "Hii",
    longDescription: "auto bot reply to your message",
    category: "no prefix",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "hi":
          const replies = [
            "Hey beautiful gyal if your a dude fucc off🤹🏾‍♂️ ",
          ];
          api.setMessageReaction("💗", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
          });
          break;
        default:
          return; 
      }
    }
  },
};