async function scholarstats(roles, userObjs, message, users, convertAddress, addresses, MessageEmbed, axieInfinityApi) {
	if (roles.includes("Manager")) {
        const list = Object.values(addresses)
		if (list.length !== 0) {
            
            let fields = [];
            const data = [];
            const embed = new MessageEmbed();
            embed.setColor("ORANGE");
            
            const promises = list.map((address) => {
                return axieInfinityApi(convertAddress(address));
            });
            const responses = await Promise.all(promises);
            console.log(responses)
            
            for (let index = 0; index < responses.length; index++) {
                data.push([userObjs[list[index]], {
                    yesterdayslp: responses[index].slp.yesterdaySLP,
                    todayslp: responses[index].slp.todaySoFar,
                    average: responses[index].slp.average,
                    rank: responses[index].leaderboard.rank
                }]);
            }
            
            
            setTimeout(() => {
                data.map((datum, index) => {
                    fields.push({
                        name: 'RANK',
                        value: `${datum[1].rank}`,
                    }, {
                        name: 'YESTERDAY SLP',
                        value: `${datum[1].yesterdayslp} SLP`
                    }, {
                        name: 'TODAY SLP',
                        value: `${datum[1].todayslp} SLP`
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
        } else {
            message.reply("No Scholar has been added")
        }

    } else {
        message.reply("You don't have access to use this command.");
    }
}

module.exports = scholarstats;
