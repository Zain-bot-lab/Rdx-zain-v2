module.exports.config = {
  name: "hijabdp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "HIJAB DP",
  commandCategory: "Random-IMG",
  usages: "hijab dp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/tPvqrVH.jpg","https://i.imgur.com/1M123yS.jpg","https://i.imgur.com/okpdmFt.jpg","https://i.imgur.com/VY08K5y.jpg","https://i.imgur.com/An91n1s.jpg","https://i.imgur.com/ENb9RAp.jpg","https://i.imgur.com/aAUBos2.jpg","https://i.imgur.com/GZRyD6t.jpg","https://i.imgur.com/aVOY30b.jpg","https://i.imgur.com/lh0EtJx.jpg","https://i.imgur.com/qajIAts.jpg","https://i.imgur.com/IiOJVjq.jpg","https://i.imgur.com/W8M7aML.jpg","https://i.imgur.com/EPgAZYe.jpg","https://i.imgur.com/bSVVkv4.jpg","https://i.imgur.com/pKqztui.jpg","https://i.imgur.com/p2Jhu2W.jpg","https://i.imgur.com/a0VKSjy.jpg","https://i.imgur.com/8LX1VuZ.jpg","https://i.imgur.com/7wcCIjZ.jpg","https://i.imgur.com/dRvwevs.jpg","https://i.imgur.com/zR3O2jc.jpg","https://i.imgur.com/AcUos3J.jpg","https://i.imgur.com/4VwjQvh.jpg","https://i.imgur.com/6h7BRr9.jpg",
     ];
     var callback = () => api.sendMessage({body:`┏━━━━━┓\n     ꧁𝐙𝐚𝐢𝐧𝐢-𝐉𝐮𝐭𝐭꧂                    ✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
}
