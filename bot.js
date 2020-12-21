const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('4bc13609908528bbd430f66d2b5c454463cde7873ec19a2251a70e96c2ee8f95');
