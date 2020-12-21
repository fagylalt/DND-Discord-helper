const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.login(config.token)
client.once('ready', () => {
	console.log('Ready!');
});



client.on('message', message =>{
    if(message.content === "!1d20"){
        let random = Math.floor(Math.random()*20)
        message.channel.send("You rolled: "+random);
    }
});