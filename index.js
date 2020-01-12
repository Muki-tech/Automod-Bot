const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require ('ms');

const token = 'NjY0ODY4MjAyMDg1NDgyNTM2.XhnBiw.Z2hIHcgESdlKE1dXuI9eKlhtZrc';

const PREFIX = '!';

var version = '1.0.5'

bot.on('ready' , () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    console.log(`${bot.user.tag} Is online `);
    bot.user.setPresence({ game: { name: 'Private bot lol', type: 0 } });
    bot.user.setStatus('dnd')
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "👋joins👋");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member}!`)
});

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'hi':
            message.channel.sendMessage('Hello!')
            break;
        case 'dusekk':
            message.channel.sendMessage('Hi Dusekk')
            break;
        case 'info':
            if (args[1] === 'version'){
                message.channel.sendMessage('Version ' + version);
            }else{
                message.channel.sendMessage('Invalid Args')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error please define secound arg')
            message.channel.bulkDelete(args[1]);
            break;
        case 'myinfo':
            const embed = new Discord.RichEmbed()
            .setTitle('User Information')
            .setDescription("Bot Owner: **Muki**")
            .addField('Your User Name', message.author.username ,true)
            .addField('Bot Version', version ,true)
            .addField('Current Server', message.guild.name ,true)
            .addField("**Commands**", "hi,mute,ping,uptime,myinfo,info version,clear,shutdown,restart")
            .addField("Apply for moderator here", "https://forms.gle/XYaabkThpNVkX6Ym8" ,true)
            .setColor(0x29d9d9)
            .setThumbnail(message.author.avatarURL)
            .setFooter('Prefix is [!] lol')
            message.channel.sendEmbed(embed);
            break;
    }
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I can't find user" + person)
 
            let mainrole = message.guild.roles.find(role => role.name === "Verified");
            let role = message.guild.roles.find(role => role.name === "Muted");
           
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
               
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
   
        break;
    }
 
 
});
 
bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ok':
            message.react('🆗');
    }
})
                       
bot.on('message', message => {
    if (message.channel.type != 'text' || message.author.bot)
      return;
  
    let command = message.content.split(' ')[0].slice(1);
    let args = message.content.replace('.' + command, '').trim();
  
    switch (command) {
      case 'ping': {
        message.channel.send('Pong! (~ ' + bot.ping + 'ms)');
        break;
      }
  
  
      case 'uptime': {
        // bot.uptime is in millseconds
        // this is just maths, I won't explain much of it
        // % is modulo, AKA the remainder of a division
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
  
        message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
        break;
      }
    }
  });

bot.on('message', message => {
    if (message.channel.type != 'text' || message.author.bot)
        return;
    
      let command = message.content.split(' ')[0].slice(1);
      let args = message.content.replace('.' + command, '').trim();
      let isBotOwner = message.author.id == '419483752046002186';
    
      switch (command) {
        case 'restart': {
          if (!isBotOwner)
           return;
   
          message.channel.send('Restarting...').then(m => {
            bot.destroy().then(() => {
              bot.login('NjY0ODY4MjAyMDg1NDgyNTM2.XhdUzg.SYlKAnnri2pT98gOuGvL4IryE3Q');
            });
          });
          break;
        }
    
    
        case 'shutdown': {
          if (!isBotOwner)
            return;
    
          message.channel.send('Shutting down...:white_check_mark:').then(m => {
            bot.destroy();
          });
          break;
        }
      }
    });

bot.login(token);