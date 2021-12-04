async function addronin(
	roles,
	args,
	client,
	addDoc,
	userCollectionRef,
	ids,
	addresses,
	userObjs,
	users,
	message
) {
	if (roles.includes("Manager")) {
		if (message.guild.me.permissionsIn(message.channel).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
			let [user, address] = args;
			if (user.includes("!")) {
				let [first, second] = user.split("!");
				user = first.concat(second);
			}
			const userId = user.slice(2, -1);
			const { tag, username } = client.users.cache.get(userId);
			if (!users.includes(tag)) {
				const result = await addDoc(userCollectionRef, {
					"discord username": tag,
					"ronin address": address,
				});
				ids[tag] = result._key.path.segments[1];
				addresses[tag] = address;
				userObjs[address] = username;
				users.push(tag);
				message.reply("Ronin added successfully.");
			} else {
				message.reply("User already exists.");
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

module.exports = addronin;
