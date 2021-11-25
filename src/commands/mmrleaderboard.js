async function mmrleaderboard(roles, MessageEmbed, message, addresses, axieInfinityApi, convertAddress, userObjs) {
    if (roles.includes("Admin") | roles.includes("Moderator")) {
        let fields = [];
		const data = [];
		const list = Object.values(addresses)
        const embed = new MessageEmbed();
        embed.setColor("AQUA");
        embed.setTitle(`${message.guild.name}'s MMR Leaderboard`);

        const promises = list.map((address) => {
			return axieInfinityApi(convertAddress(address));
		});
        const responses = await Promise.all(promises);
        
		for (let index = 0; index < responses.length; index++) {
			data.push([userObjs[list[index]], responses[index].leaderboard.elo]);
		}

		setTimeout(() => {
			data.sort((a, b) => {
				return a[1] - b[1];
			});
			data.reverse();
			data.map((datum, index) => {
				fields.push({
					name: `#${index + 1} ${datum[0]}`,
					value: `Has ${datum[1]} MMR`,
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
        message.reply("You don't have access to use this command.");
    }
}

module.exports = mmrleaderboard