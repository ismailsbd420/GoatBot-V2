module.exports = {
  config: {
    name: "orochi",
    aliases: ["oro"],
    version: "1.0",
    author: "GoatAI by LiANE",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Orochi command for Bot Admins",
      tl: "Orochi command para sa mga Bot Admins"
    },
    longDescription: {
      en: "Orochi command with limited access for Bot Admins only",
      tl: "Orochi command na may limitadong access para sa mga Bot Admins lamang"
    },
    category: "goatBot",
    guide: {
      en: "{p}orochi",
      tl: "{p}orochi"
    }
  },
  
  onStart: async function({ event, message, args, threadsData, usersData, api }) {
    // Check if the sender is a bot admin
    const adminIDs = global.GoatBot.config.DEV; // Replace with the actual bot admin IDs
    
    if (!adminIDs.includes(event.senderID)) {
      message.reply("You are not authorized to use this command.");
      return;
    }
    
    message.reply("Orochi command is ready for use by Bot Admins only.");  
  },
  
  onChat: async function ({ event, message, threadsData, usersData, api }) {
    // No need to implement anything here since the command can only be used by bot admins
  },
  
  onReply: async function ({ event, message, threadsData, usersData, api, Reply }) {
    // No need to implement anything here since the command can only be used by bot admins
  }
}