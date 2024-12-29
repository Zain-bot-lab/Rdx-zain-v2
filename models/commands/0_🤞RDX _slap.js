module.exports.config = {
  name: "slap",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "Slap the friend tag",
  commandCategory: "general",
  usages: "slap [Tag someone you want to slap]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  
  const adminUID = '100086033644262'; // Admin UID
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  // Check if the user tagged the admin
  if (Object.keys(event.mentions)[0] === adminUID && event.senderID !== adminUID) {
    return out("𝐇𝐀𝐃 𝐌𝐀 𝐑𝐇𝐎 𝐁𝐀𝐁𝐔 𝐎𝐖𝐍𝐄𝐑 𝐇𝐘 𝐌𝐄𝐑𝐀 𝐙𝐀𝐈𝐍 𝐏𝐀 𝐘𝐀 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐔𝐒𝐄 𝐍𝐇𝐈 𝐇𝐎 𝐒𝐀𝐊𝐓𝐈 𝐊𝐈𝐎 𝐊 𝐉𝐀𝐀𝐍 𝐇𝐘 𝐌𝐀𝐑𝐈 🥱🥱🥱");
  }

  // Check if there's a mention
  if (!args.join("")) return out("Please tag someone to slap.");
  
  return axios.get('https://api.waifu.pics/sfw/slap').then(res => {
    let getURL = res.data.url;
    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    var mention = Object.keys(event.mentions)[0];
    let tag = event.mentions[mention].replace("@", "");    

    let callback = function () {
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.sendMessage({
        body: "Slapped! " + tag + "\n\n*sorry, I thought there was a mosquito*",
        mentions: [{
          tag: tag,
          id: mention
        }],
        attachment: fs.createReadStream(__dirname + `/cache/slap.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/slap.${ext}`), event.messageID);
    };

    request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/slap.${ext}`)).on("close", callback);
  })
  .catch(err => {
    api.sendMessage("Failed to generate gif, be sure that you've tagged someone!", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
  });     
}
