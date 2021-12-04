require("dotenv").config();

var axios = require("axios").default;

const db = require("./firebase-config");

const {
	convertAddress,
	axieInfinityApi,
} = require("./botfunctions");

const addronin = require("./commands/addronin");
const deleteronin = require("./commands/deleteronin");
const scholarstats = require("./commands/scholarstats");
const mmrleaderboard = require("./commands/mmrleaderboard");
const slpleaderboard = require("./commands/slpleaderboard");

const {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} = require("firebase/firestore");

const { Client, Intents, MessageEmbed } = require("discord.js");

const userCollectionRef = collection(db, "user details");
const PREFIX = "?";

const ids = {};
let users = [];
const addresses = {};
const userObjs = {};

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});
client.on("ready", async () => {
	console.log(`${client.user.tag} is online`);
	const details = await getDocs(userCollectionRef);

	details.docs.map((doc) => {
		const username =
			doc._document.data.value.mapValue.fields["discord username"]
				.stringValue;
		const address =
			doc._document.data.value.mapValue.fields["ronin address"]
				.stringValue;
		ids[username] = doc._document.key.path.segments[6];
		addresses[username] = address;
		userObjs[address] = username.split("#")[0];
		users.push(username);
	});
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(PREFIX)) {
		const [cmdName, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);

		const guild = client.guilds.cache.get(message.guildId);

		const senderRoleIds = guild.members.cache.get(message.author.id)._roles;
		const roles = senderRoleIds.map((roleId) => {
			return guild.roles.cache.get(roleId).name;
		});
		switch (cmdName) {
			case "addronin":
				addronin(
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
				);
				break;
			case "deleteronin":
				deleteronin(
					roles,
					args,
					client,
					users,
					ids,
					db,
					doc,
					deleteDoc,
					message,
					userObjs,
					addresses
				);
				break;
			case "scholarstats":
				scholarstats(
					client,
					roles,
					userObjs,
					message,
					users,
					convertAddress,
					addresses,
					MessageEmbed,
					axieInfinityApi
				);
				break;
			case "mmrleaderboard":
				mmrleaderboard(
					roles,
					MessageEmbed,
					message,
					addresses,
					axieInfinityApi,
					convertAddress,
					userObjs,
					users
				);
				break;
			case "slpleaderboard":
				slpleaderboard(
					roles,
					MessageEmbed,
					message,
					addresses,
					axieInfinityApi,
					convertAddress,
					userObjs,
					users
				);
				break;
			default:
				message.reply("Invalid command");
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
