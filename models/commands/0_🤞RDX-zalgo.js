module.exports.config = {
	name: "zalgo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "RDX_ZAIN",
	description: "Converts your text to Zalgo",
	commandCategory: "game",
	depndencies: {"to-zalgo":""},
	usages: "zalgo <text>",
	cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  const Zalgo = require("to-zalgo");
  return api.sendMessage(Zalgo(args.join(" ")), event.threadID, event.messageID);
}
