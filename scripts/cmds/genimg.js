const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
	config: {
		name: "genimg", 
		aliases: ["imggen"], 
		version: "1.0.2", 
		author: "Samir B. Thakuri", 
		role: 0,
		countDown: 5,
		shortDescription:{
			en: "Generate AI image",
    },
		longDescription:{
			en: "Search and generate images using AI",
    }, 
		category: "ai", 
		guide: {
			en: "{pn} <promot> - <number of images>"
		}
	}, 

	onStart: async function({ api, event, args }) {
    function checkPermissionAndSendMessage(permission, message) {
  if (!permission.includes(event.senderID)) {
    api.sendMessage(message, event.threadID, event.messageID);
    return false;
  }
  return true;
}

const GODPermission = global.GoatBot.config.GOD;
const vipUserPermission = global.GoatBot.config.vipUser;
const adminBotPermission = global.GoatBot.config.adminBot;

const permissionMessage = "You are not VIP user to use this cmd. Use /request to ask  permission for this cmd to authors";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

if (!checkPermissionAndSendMessage(vipUserPermission, permissionMessage)) {
  return;
}
if (!checkPermissionAndSendMessage(adminBotPermission, permissionMessage)) {
  return;
}
		const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('Please enter in the correct format, use /help genimg to see user manual for this command.', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await axios.get(`https://free-api.ainz-sama101.repl.co/others/genimg?prompt=${encodeURIComponent(keySearchs)}`);
    const data = res.data.result;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/tmp/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/tmp/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: `Successfully Generated ${numberSearch} For Your Prompt \n'${keySearchs}'`
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`)
    }
}
};