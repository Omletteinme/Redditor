const Discord = require('discord.js');

module.exports = {
  
  name: 'invite',
  description: 'Invite the bot',
  category: 'Misc',
  execute(message, args){
    const embed = new Discord.MessageEmbed()
     .setTitle('Click here to invite the bot')
     .setURL('https://discord.com/api/oauth2/authorize?client_id=936261959056257065&permissions=8&scope=bot')
     .setTimestamp();
     message.reply(embed);
  }

};