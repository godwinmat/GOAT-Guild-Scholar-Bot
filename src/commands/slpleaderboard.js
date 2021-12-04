async function slpleaderboard(
	roles,
	MessageEmbed,
	message,
	addresses,
	axieInfinityApi,
	convertAddress,
	userObjs,
	users
	) {
	if (roles.includes("Manager") || message.author.id === "864924045693419562") {
		const list = Object.values(addresses)
		if (list.length !== 0) {
            if (message.guild.me.permissionsIn(message.channel).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL'])) {
				let fields = [];
				const data = [];
				const embed = new MessageEmbed();
				embed.setColor("DARK_VIVID_PINK");
				embed.setTitle(`${message.guild.name}'s SLP Leaderboard`);
				
				const promises = list.map((address) => {
					return axieInfinityApi(convertAddress(address));
				});
				const responses = await Promise.all(promises);
				
				for (let index = 0; index < responses.length; index++) {
					data.push([userObjs[list[index]], responses[index].slp.total]);
				}
				
				setTimeout(() => {
					data.sort((a, b) => {
						return a[1] - b[1];
					});
					data.reverse();
					data.map((datum, index) => {
						fields.push({
							name: `#${index + 1} ${datum[0]}`,
							value: `Has ${datum[1]} SLP`,
						});
						if ((index + 1) % 25 === 0) {
							if (index + 1 === data.length) {
								embed.setTimestamp();
							}
							embed.setFields(fields);
							message.channel.send({ embeds: [embed] });
							embed.setTitle("Some more leaderboard")
							fields = [];
						}
						
						if (index + 1 === data.length) {
							if ((index + 1) % 25 !== 0) {
								embed.setTimestamp();
								embed.setFields(fields);
								message.channel.send({ embeds: [embed] });
								fields = [];
							}
						}
					});
				}, 4000);
			} else {
				if (message.guild.me.permissionsIn(message.channel).has(['SEND_MESSAGES'])) {
                    message.channel.send("I don't have the permissions i need to work in this channel.")
                    message.channel.send("The permissions i need are: VIEW CHANNEL, SEND MESSAGES, READ MESSAGE HISTORY and EMBED LINKS.")
                } else {
                    console.log("I don't have the permissions i need to work in this channel.")
                    console.log("The permissions i need are: VIEW CHANNEL, SEND MESSAGES, READ MESSAGE HISTORY and EMBED LINKS.")
                }
			}
		} else {
			message.reply("No Scholar has been added")
		}
	} else {
		message.reply("You don't have access to use this command.");
	}
}

module.exports = slpleaderboard;
