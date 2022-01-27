const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const express = require('express');
const prefix = 'r/';
const { status } = require('./templates/status.js');

const fetch = require('node-fetch');
const Client = new Discord.Client(); 
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);
app.listen(process.env.PORT || 5000, () => console.log('Bound to port'));

//Set Status
const setStatus = () => {
  const options = status(prefix, Client);
  const random = Math.floor(Math.random() * options.length);
  Client.user.setPresence(options[random]);
};

Client.once('ready', () => {
  console.log('Bot logged in!');
  setInterval(setStatus, 3000);
});



Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	Client.commands.set(command.name, command);
}


Client.on('message', async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if(command=='invite'){

     const embed = new Discord.MessageEmbed()
     .setTitle('Click here to invite the bot')
     .setURL('https://discord.com/api/oauth2/authorize?client_id=936261959056257065&permissions=8&scope=bot')
     .setTimestamp();
     message.reply(embed);
  }
    
    let data = await fetch('http://meme-api.herokuapp.com/gimme/'+command)
      .then(res => res.json())
    if(data.url){
      if(data.nsfw){
        if(message.channel.nsfw){
          const embed  = new Discord.MessageEmbed()
      .setTitle(data.title)
        .setURL(data.postLink)
        .setColor("RANDOM")
        .setFooter(data.ups + " Upvotes")
        .setTimestamp()
        .setImage(data.url);
        

      message.channel.send(embed);
        }

        else{
          const embed = new Discord.MessageEmbed()
          .setTitle("Sorry! Its NSFW")
           .setImage("https://i.imgur.com/oe4iK5i.gif")
           .setFooter("Try again in an NSFW channel");
           message.channel.send(embed);
        }
      }

      else{
        const embed  = new Discord.MessageEmbed()
      .setTitle(data.title)
        .setURL(data.postLink)
        .setColor("RANDOM")
        .setFooter(data.ups + " Upvotes")
        .setTimestamp()
        .setImage(data.url);

      message.channel.send(embed);
      }
    }
      
    else{
      message.reply("Result doesn\'t contain any images", "We can't load this post :|");
    }
      
  
});


Client.login('OTM2MjYxOTU5MDU2MjU3MDY1.YfKn5Q.FuTj6pU_M2aNWTEG29tb5YDq47A');