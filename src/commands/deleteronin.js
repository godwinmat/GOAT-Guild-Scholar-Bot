async function deleteronin(roles, args, client, users, ids, db, doc, deleteDoc, message, userObjs, addresses) {
	if (roles.includes("Manager")) {
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
        } else {
            message.reply("User does not exists.");
        }
    } else {
        message.reply("You don't have access to use this command.");
    }
}

module.exports = deleteronin