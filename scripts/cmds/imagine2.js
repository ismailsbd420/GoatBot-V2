const axios = require('axios');

module.exports = {
  config: {
    name: "dreamshaper",
    aliases: ["ds"],
    author: "404",
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: "Generates an image from a text description",
    longDescription: "Generates an image from a text description",
    category: "image",
    guide: {
      en: `{pn} prompt`,
      
    }
  },

  langs: {
    en: {
      loading: "Generating image, please wait...",
      error: "An error occurred, please try again later"
    }
  },

  onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    const { threadID } = event;

    const info = args.join(" ");
    if (!info) {
      return message.reply(`type your imagination!`);
    } else {
      const timestamp = new Date().getTime();

      try {
        let msgSend = message.reply(getLang("loading"));
        const { data } = await axios.get(
      `https://f2473acb-90cc-4912-aa2b-3183d01c51dc-00-34773xvoxpk0n.riker.replit.dev/dreamshaper/api?prompt=${info}`
        );

        const imageUrls = data.output[0];

        const shortLink = await require('tinyurl').shorten(imageUrls);
       
        await message.unsend((await msgSend).messageID);
        if (imageUrls) {
          message.reply({
            body: shortLink,
            attachment: await global.utils.getStreamFromURL(imageUrls)
          });
        } else {
          throw new Error("Failed to fetch the generated image");
        }
      } catch (err) {
        console.error(err);
        return message.reply(getLang("error"));
      }
    }
  }
};