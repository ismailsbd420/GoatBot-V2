const axios = require('axios');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "bing",
    aliases: ["dalle"],
    version: "2,0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    longDescription: {
      en: "Latest DALL·E 3 image generator",
    },
    guide: {
      en: "{pn} 'prompt' ",
    },
    category: "Bing",
  },
  onStart: async function ({ message, args }) {
    try {
      if (args.length === 0) {
        await message.reply("⚠ | Please provide a prompt.");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = [
"1OHX2FteHzRuiUrxUjHaIbJZjdPwwNtBLm_7e1fyAy1mNmMmuB7OizB5FDeosKQqPPCowFBKaRL6ZMCdE92qYSCHfH5VVTNY58pVQ_22zBunxdxiHOnjGJQB_tyKFZ378YFkkvPnoE4OI9oIfjl2qDyDmM5I5_SFEuJ",
"1B-IFzQzQW4HOfNwb7nv60r7o3Io--6UY6j4dvqZkym9tau44fHHbFpFWCwEI5P7qiZTtEh31DSenAWFQ_OuE1P2tmBS0axVHjq_JA8KCfA6ZW-nlA2EZJVaR8snaKhYfg-IriBU6P89OlZf1d4cIPcZlXmHukLw5BQE8RPKjlHVsUplvzPUC9jnaYvmGDH91vBSL2GL3qvIwOtbdzeRyZQ",
"1iByt3Q0rMO9EgBD_A22AclSc5sukdy55EJJUHFx1DL7Wvid_lH59pcRIcuWLjLEEIML4K44V9pt62kumxiWE1-ofwtpIK10EAbfHmn4KPLJkH_zTiNqbqL-XdNu0b9QomTSDj4NHU32CMlbGt4goQq2iGKGJIgXxrLgIy27uECs48V3dMQaFk15MGERbXpeKzF9IfzkhGb1FlMWbmG05_A",
"11w9lmVQcSudzZk4mDUvcs6KJTFpQmXcl0SDr_eEsfEJOlgNvl7Y9aVsDLYOYYzzsp3NuOGtk4F9Y2fuDWwGYZVhlCMma9TRRToG2rI_JRWM_WD0yI2bxMm0nL4weJALM-MvCfFsQwuOhX9HDyBW6cq-OJ5LPDys6J7aNhkLejNV-4ybcjNLJUY7quCHeiw0rmEyZpn9LE-ygNr5qPQ2Nog",
"1GNPIpZR_cR9NA4eW0w1YvsYpJ42JaIJWdziwgPuhM50aYocmdPpAkJ-e_PxGHNP_BnW_QDWwUeyS0NiSQBNlQQdTWwm4ctsT1cbtGgkJ6LMuqgnvlsz5KVn1nsGJ-I7Pf3cE3uh7F0NvPn6sGs1d-J1Ah9SIxkuUQX_7Am4ScT5hvkkyzRFCuQ1ROKJezECgcyJQQDo4-SZCwr7w5igeAg",
"1eFvUf4-pOg-XChs9wiE5soT5-4lVG_U8h9MKL_Cp9d5oSGOw4dTvXM6Ejk7v4U5-J5Bjljw0UzJe5r4-Zbyw6Lbj6LsSE06QzvwjhPvWC4x87QtsMwLFHR-vGZAqkvKvNEfmTw_hDbExtUGN9GHqqRjsvHGLs5UiG2cLI37k-sBilZv4jBzmZmm707U97Yfdcat5Z34zBS-3TTqmGbsS-g"
]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `https://dall-e-3-rubish.onrender.com/api/gen-img-url?prompt=${encodedPrompt}&cookie=${randomCookie}&apiKey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

Prompt: ${prompt}

Please wait a few seconds...`);

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply("⚠ | Invalid API key. Please check your API key and try again.");
        } else {
          await message.reply(`
⭕ | No images found for the 

prompt: ${prompt}. 

Please try again.`);
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));

      await message.reply({
        body: `
✅ | Here are the images for..

Prompt: "${prompt}" 

Processing Time: ${processingTimeInSeconds}s`,
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply("⚠ | Unauthorized your API key \n\nContact with Rubish for a new apikey");
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply("⚠ | This prompt has been blocked by Bing. Please try again with another prompt.");
        } else if (typeof responseData === 'object') {
          const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n');
          await message.reply(`⚠ | Server error details:\n\n${errorMessages}`);
        } else if (error.response.status === 404) {
          await message.reply("⚠ | The DALL·E 3 API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠ | Rubish dalle -3 server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};