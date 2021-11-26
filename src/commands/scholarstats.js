async function scholarstats(roles, userObjs, message, users, convertAddress, addresses, MessageEmbed, axieInfinityApi) {
	if (roles.includes("Manager")) {
        let fields = [];
		const data = [];
        const list = Object.values(addresses)
        const embed = new MessageEmbed();
        embed.setColor("ORANGE");
        
        const promises = list.map((address) => {
            return axieInfinityApi(convertAddress(address));
		});
        const responses = await Promise.all(promises);
        
        for (let index = 0; index < responses.length; index++) {
            data.push([userObjs[list[index]], {
                yesterdayslp: responses[index].slp.yesterdaySLP,
                average: responses[index].slp.average,
                rank: responses[index].leaderboard.rank
            }]);
        }
        
        console.log(data)
        
        setTimeout(() => {
			data.map((datum, index) => {
                fields.push({
                    name: 'RANK',
					value: `${datum[1].rank}`,
                }, {
                    name: 'YESTERDAY SLP',
                    value: `${datum[1].yesterdayslp} SLP`
                }, {
                    name: 'AVERAGE SLP',
                    value: `${datum[1].average} SLP`
                });
                
                embed.setTitle(`${datum[0]}'s Stats`);
                embed.setFields(fields);
                message.channel.send({ embeds: [embed] });
                fields = []
			});
		}, 4000);
        

    }
}

module.exports = scholarstats;