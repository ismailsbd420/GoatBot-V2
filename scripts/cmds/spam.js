const fs = require("fs");
module.exports = {
	config: {
		name: "spam",
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "spam",
		longDescription: "Do spam in a loop of any text 20 times",
		category: "useless",
		guide:  {
			vi: "{pn} <TextToSpam>"
		}
	},  
	onStart: async function ({ api,event,args }) {
    function checkPermissionAndSendMessage(permission, message) {
  if (!permission.includes(event.senderID)) {
    api.sendMessage(message, event.threadID, event.messageID);
    return false;
  }
  return true;
}

const GODPermission = global.GoatBot.config.GOD;

const permissionMessage = "You don't have enough permission to use this command. Only My Authors Have Access";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

		const axios = require("axios");
 const message = args.join(' ');
 if (!message)
return api.sendMessage(`Type the text that you want to spam.. `, event.threadID, event.messageID);
	var k = function (k) { api.sendMessage(k, event.threadID)};
for (i = 0; i < 20; i++) 
{ k(`${message}`);} 
 }
};