const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports = {
  config: {
  name: "album",
  version: "1.0.0",
  role: 0,
  author: "Dipto",
  longDescription: "Displays album options for selection.",
  category: "Media",
  countDown: 5,
  guide: {
      en: "Only or add [cartoon/photo/lofi/sad/islamic/funny/horny/anime]"
}
},

onStart: async function ({ api, event, args}) {
  if (!args[0]){
    { api.setMessageReaction("😘", event.messageID, (err) => {}, true);
    }
  const albumOptions = [
    "𝗙𝘂𝗻𝗻𝘆 𝘃𝗶𝗱𝗲𝗼",
     "𝗜𝘀𝗹𝗮𝗺𝗶𝗰 𝘃𝗶𝗱𝗲𝗼",
     "𝗦𝗮𝗱 𝘃𝗶𝗱𝗲𝗼",
     "𝗔𝗻𝗶𝗺𝗲 𝘃𝗶𝗱𝗲𝗼",
     "𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘃𝗶𝗱𝗲𝗼",
     "𝗟𝗼𝗙𝗶 𝗩𝗶𝗱𝗲𝗼",
     "𝗛𝗼𝗿𝗻𝘆 𝘃𝗶𝗱𝗲𝗼"
  ];

  const message = "❤‍🩹 𝗖𝗵𝗼𝗼𝘀𝗲 𝗮𝗻 𝗼𝗽𝘁𝗶𝗼𝗻𝘀 𝗕𝗮𝗯𝘆 <💝\n"+"✿━━━━━━━━━━━━━━━━━━━━━━━✿\n"+ albumOptions.map((option, index) => `${index + 1}. ${option} 🐤`).join("\n")+"\n✿━━━━━━━━━━━━━━━━━━━━━━━✿";

  await api.sendMessage(message, event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: albumOptions
  })},event.messageID);
}
//------------Video Add--------------//
const validCommands = ['cartoon', 'photo', 'lofi', 'sad', 'islamic','funny','horny','anime'];
  { api.setMessageReaction("👀", event.messageID, (err) => {}, true);
  }
    if (!args[1] || !validCommands.includes(args[1])) return;
    if (!event.messageReply || !event.messageReply.attachments) return;
    const attachment = event.messageReply.attachments[0].url;
    const URL = attachment;
    let query;
    switch (args[1]) {
        case 'cartoon':
            query = 'addVideo';
            break;
        case 'photo':
            query = 'addPhoto';
            break;
        case 'lofi':
            query = 'addLofi';
            break;
        case 'sad':
            query = 'addSad';
            break;
        case 'funny':
            query = 'addFunny';
            break;
        case 'islamic':
            query = 'addIslamic';
            break;
        case 'horny':
            query = 'addHorny';
            break;
        case 'anime':
            query = 'addAnime';
            break;
        default:
            break;
    }
    try {
        const response = await axios.get(`https://sandipapi.onrender.com/imgur?link=${encodeURIComponent(URL)}`);
        const imgurLink = res.data.uploaded.image;
        const fileExtension = path.extname(imgurLink);
   let query2;
        if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {query2 = 'addPhoto';} 
else if (fileExtension === '.mp4') {
  query2 = query;} else {
            api.sendMessage('Invalid file format.', event.threadID, event.messageID);
            return;
        }
        const svRes = await axios.get(`https://zzxfh5-3000.csb.app/data?${query2}=${imgurLink}`);
const data = svRes.data;
     //   console.log(data);
        api.sendMessage(`✅ | ${data.data}\n\n🔰 | ${data.data2}`, event.threadID, event.messageID);
    } catch (error) {console.error('Error:', error);api.sendMessage(`Failed to convert image.\n${error}`, event.threadID, event.messageID);
}
},
global.GoatBot.onReply: async function ({ api, event, handleReply }) {
  api.unsendMessage(handleReply.messageID);
  if (event.type == "message_reply") {
  const reply = parseInt(event.body);
  if (isNaN(reply)) {
    return api.sendMessage("Please reply with either 1 - 7", event.threadID, event.messageID);
  }
  let query;
  let cp;
  if (reply === 1) {
    query = "funny";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗙𝘂𝗻𝗻𝘆 𝘃𝗶𝗱𝗲𝗼 <🤣";
  } else if (reply === 2) {
    query = "islamic";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗜𝘀𝗹𝗮𝗺𝗶𝗰 𝘃𝗶𝗱𝗲𝗼 <😇";
  }else if (reply === 3) {
      query = "sad";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗦𝗮𝗱 𝘃𝗶𝗱𝗲𝗼 <🥺";
    }else if (reply === 4) {
      query = "anime";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗮𝗻𝗶𝗺 𝘃𝗶𝗱𝗲𝗼 <😘";
    }else if (reply === 5) {
      query = "video";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘃𝗶𝗱𝗲𝗼 <😇";
    }else if (reply === 6) {
      query = "lofi";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗟𝗼𝗳𝗶 𝘃𝗶𝗱𝗲𝗼 <😇";
    }
    else if (reply === 7) {
    query = "horny";
    cp = "𝗡𝗮𝘄 𝗕𝗮𝗯𝘆 𝗛𝗼𝗿𝗻𝘆 𝘃𝗶𝗱𝗲𝗼 <🥵";
    }
  //console.log(query);
  try {
    const res = await axios.get(`https://zzxfh5-3000.csb.app/data?type=${query}`);
    const imgUrl = res.data.data;
    const imgRes = await axios.get(imgUrl, { responseType: 'arraybuffer' });

    const filename = __dirname + '/cache/d1p.mp4';
    fs.writeFileSync(filename, Buffer.from(imgRes.data, 'binary'));

    api.sendMessage({
        body: cp,
        attachment: fs.createReadStream(filename),
      },
      event.threadID,
      () => fs.unlinkSync(filename), event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while fetching the media.', event.threadID, event.messageID);
  }
  }
}
};