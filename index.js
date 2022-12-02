const { Client, Events, GatewayIntentBits , REST, Routes, Collection, } = require('discord.js');
// Create a new client instance
const client = new Client({  
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] 
});
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()

const Token = process.env.TOKEN;
const ChanelID = process.env.CHANNEL_ID;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFile) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(Token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

 client.login(Token);

 //read massage
client.on("messageCreate", (message) => {
	if (message.author.bot) return false; 
	console.log(`Message from ${message.author.username}: ${message.content} , AuthorID ${message.author.id} , ChannelID ${message.channel.id}`);
    //send massage
    if (message.content === "Server active") {
        message.channel.send(`I am Active in ${client.guilds.cache.size} Servers`);
    }
  });