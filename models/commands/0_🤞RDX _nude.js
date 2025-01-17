module.exports.config = {
  name: "nude",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "",
  commandCategory: "18+",
  usages: "",
  cooldowns: 5,
  dependencies: { "fs-extra": "", "axios": "" }
};

module.exports.run = async function ({ event, api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  
  // Check if the sender's UID matches yours
  if (event.senderID !== '100086033644262') {
    return api.sendMessage("You do not have permission to use this command.", event.threadID, event.messageID);
  }

  try {
    var getlink = (await axios.get(`https://api-milo.herokuapp.com/nude`)).data;
    var url = getlink.url;
    var stt = getlink.stt;
    var length = getlink.length;
    var getimg = (await axios.get(url, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(__dirname + `/cache/${event.senderID}-${event.threadID}.png`, Buffer.from(getimg, "utf-8")); 
    api.sendMessage(
      { body: `ảnh số : (${stt}/${length})`, attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}-${event.threadID}.png`) },
      event.threadID,
      () => fs.unlinkSync(__dirname + `/cache/${event.senderID}-${event.threadID}.png`),
      event.messageID
    );

    console.log(getlink);
  } catch (error) {
    console.error("Error fetching image:", error);
    api.sendMessage("An error occurred. Please try again later.", event.threadID, event.messageID);
  }
};
