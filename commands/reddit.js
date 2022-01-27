const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
  
  name: 'reddit',
  description: 'Get results from a subreddit',
  category: 'Content',
  async execute(message, args){
    let data = await fetch('http://meme-api.herokuapp.com/gimme/'+args.join(' '))
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
      

    
  }

};