module.exports = {
  config: {
    name: "love",
    aliases: [],
    version: "1.0",
    author: "GoatAI by LiANE",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "GoatAI - What is love?",
      tl: "GoatAI - Ano ang pag-ibig?",
    },
    longDescription: {
      en: "GoatAI - Responds to the question 'What is love?'",
      tl: "GoatAI - Nagbibigay ng sagot sa tanong na 'Ano ang pag-ibig?'",
    },
    category: "goatBot",
    guide: {
      en: "{p}love",
      tl: "{p}love",
    },
  },
  onStart: async function ({ event, message }) {
    if (event.body.toLowerCase().includes("what is love?")) {
      message.reply("Love is a deep affection or strong feeling of care and kindness towards someone or something. It encompasses empathy, compassion, and a desire for the well-being of the person or thing that is loved. Love can arise in various forms, such as romantic love, familial love, and platonic love. It is a powerful emotion that can bring joy, happiness, and fulfillment to people's lives.");

      // You can add additional responses or customize the reply as per your requirement.
    }
  },
};