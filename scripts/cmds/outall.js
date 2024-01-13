module.exports = {
	config: {
		name: "outall",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		longDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		category: "owner"
 },
  onStart: async function ({ api, args, message, event }) {
    const permission = global.GoatBot.config.GOD;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only My Authors Have Access.", event.threadID, event.messageID);
    return;
  }
	const allGroups = await api.getThreadList(100);
    const groupIDs = allGroups.map(group => group.threadID);
    
    for (const groupID of groupIDs) {
      await api.removeUserFromGroup(api.getCurrentUserID(), groupID);
    }
    
    const leaveCount = groupIDs.length;
    api.sendMessage(`Successfully Left ${leaveCount} groups.`, message.threadID);
}
}