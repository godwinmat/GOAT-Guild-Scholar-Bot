async function deleteronin(roles, args, client, users, ids, db, doc, deleteDoc, message, userObjs, addresses) {
	if (roles.includes("Manager") || message.author.id === "864924045693419562") {
		if (message.guild.me.permissionsIn(message.channel).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
            let [user] = args;
            if (user.includes("!")) {
                let [first, second] = user.split("!");
                user = first.concat(second);
            }
            const userId = user.slice(2, -1);
            const { tag, username } = client.users.cache.get(userId);
            if (users.includes(tag)) {
                const userDoc = doc(db, "user details", ids[tag]);
                await deleteDoc(userDoc);
                message.reply("Ronin deleted successfully.");
                delete userObjs[addresses[tag]];
                delete ids[tag];
                delete addresses[tag];
                users = users.filter((user) => user !== tag);
                console.log(users)
            } else {
                message.reply("User does not exists.");
            }
        } else {
            if (message.guild.me.permissionsIn(message.channel).has(['SEND_MESSAGES'])) {
                message.channel.send("I don't have the permissions i need to work in this channel.")
                message.channel.send("The permissions i need are: VIEW CHANNEL, SEND MESSAGES.")
            } else {
                console.log("I don't have the permissions i need to work in this channel.")
                console.log("The permissions i need are: VIEW CHANNEL, SEND MESSAGES.")
            }
		}
    } else {
        message.reply("You don't have access to use this command.");
    }
}

module.exports = deleteronin