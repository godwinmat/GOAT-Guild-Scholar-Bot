async function scholarstats(
	client,
	roles,
	userObjs,
	message,
	users,
	convertAddress,
	addresses,
	MessageEmbed,
	axieInfinityApi
) {
	if (
		roles.includes("Manager") ||
		message.author.id === "864924045693419562"
	) {
		const list = Object.values(addresses);
		if (list.length !== 0) {
			if (
				message.guild.me
					.permissionsIn(message.channel)
					.has([
						"SEND_MESSAGES",
						"READ_MESSAGE_HISTORY",
						"EMBED_LINKS",
						"VIEW_CHANNEL",
					])
			) {
				let fields = [];
				const data = [];
				const embed = new MessageEmbed();
				embed.setColor("ORANGE");

				const promises = list.map((address) => {
					return axieInfinityApi(convertAddress(address));
				});
				const responses = await Promise.all(promises);

				for (let index = 0; index < responses.length; index++) {
					data.push([
						userObjs[list[index]],
						{
							yesterdayslp: responses[index].slp.yesterdaySLP,
							todayslp: responses[index].slp.todaySoFar,
							average: responses[index].slp.average,
							rank: responses[index].leaderboard.rank,
						},
					]);
				}

				setTimeout(() => {
					data.map((datum, index) => {
						fields.push(
							{
								name: "RANK",
								value: `${datum[1].rank}`,
							},
							{
								name: "YESTERDAY SLP",
								value: `${datum[1].yesterdayslp} SLP`,
							},
							{
								name: "TODAY SLP",
								value: `${datum[1].todayslp} SLP`,
							},
							{
								name: "AVERAGE SLP",
								value: `${datum[1].average} SLP`,
							}
						);

						embed.setTitle(`${datum[0]}'s Stats`);
						embed.setFields(fields);
						message.channel.send({ embeds: [embed] });
						fields = [];
					});
				}, 4000);
			} else {
				if (
					message.guild.me
						.permissionsIn(message.channel)
						.has(["SEND_MESSAGES"])
				) {
					message.channel.send(
						"I don't have the permissions i need to work in this channel."
					);
					message.channel.send(
						"The permissions i need are: VIEW CHANNEL, SEND MESSAGES, READ MESSAGE HISTORY and EMBED LINKS."
					);
				} else {
					console.log(
						"I don't have the permissions i need to work in this channel."
					);
					console.log(
						"The permissions i need are: VIEW CHANNEL, SEND MESSAGES, READ MESSAGE HISTORY and EMBED LINKS."
					);
				}
			}
		} else {
			message.reply("No Scholar has been added");
		}
	} else {
		message.reply("You don't have access to use this command.");
	}
}

module.exports = scholarstats;
