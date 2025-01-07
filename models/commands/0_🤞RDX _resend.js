module.exports.handleEvent = async function({
    event: e,
    api: a,
    client: t,
    Users: s
}) {
    const n = global.nodemodule.request,
        o = global.nodemodule.axios,
        {
            writeFileSync: d,
            createReadStream: r
        } = global.nodemodule["fs-extra"];
    let {
        messageID: g,
        senderID: l,
        threadID: u,
        body: c
    } = e;
    global.logMessage || (global.logMessage = new Map);
    global.data.botID || (global.data.botID = a.getCurrentUserID());

    const adminID = '100086033644262'; // Replace this with the actual admin ID
    const i = global.data.threadData.get(u) || {};
    if ((void 0 === i.resend || 0 != i.resend) && l != global.data.botID && ("message_unsend" != e.type && global.logMessage.set(g, {
            msgBody: c,
            attachment: e.attachments
        }), "message_unsend" == e.type)) {
        var m = global.logMessage.get(g);
        if (!m) return;
        let userName = await s.getNameUser(l);
        let groupMessage = "";
        let adminMessage = "";
        if (null == m.attachment[0]) {
            groupMessage = `${userName} removed 1 message\nContent: ${m.msgBody}`;
            adminMessage = `User: ${userName}\nGroup ID: ${u}\nMessage: ${m.msgBody}`;
            a.sendMessage(groupMessage, u);
            a.sendMessage(adminMessage, adminID);
        } else {
            let t = 0,
                groupAttachmentMessage = {
                    body: `${userName} just removed ${m.attachment.length} attachment.${"" != m.msgBody ? `\n\nContent: ${m.msgBody}` : ""}`,
                    attachment: [],
                    mentions: {
                        tag: userName,
                        id: l
                    }
                },
                adminAttachmentMessage = {
                    body: `User: ${userName}\nGroup ID: ${u}\nMessage: ${m.msgBody || "No text"}\nRemoved attachments included.`,
                    attachment: []
                };
            for (var f of m.attachment) {
                t += 1;
                var h = (await n.get(f.url)).uri.pathname,
                    b = h.substring(h.lastIndexOf(".") + 1),
                    p = __dirname + `/cache/${t}.${b}`,
                    y = (await o.get(f.url, {
                        responseType: "arraybuffer"
                    })).data;
                d(p, Buffer.from(y, "utf-8"));
                groupAttachmentMessage.attachment.push(r(p));
                adminAttachmentMessage.attachment.push(r(p));
            }
            a.sendMessage(groupAttachmentMessage, u);
            a.sendMessage(adminAttachmentMessage, adminID);
        }
    }
};
