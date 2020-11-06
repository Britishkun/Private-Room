require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "$";
client.login(process.env.BOT_TOKEN);

var mysql = require('mysql');
const botID = ",D"
const shards = '1';
const pref = `"$"`;
const ver = `"v2"`;

async function updstats() {
        // Update Stats
        try {
                await con.query(`UPDATE DiscordBots SET Servers = ${client.guilds.cache.array().length}, Users = ${client.users.cache.array().length}, Shards = ${shards}, Version = ${ver}, Prefix = ${pref} WHERE DiscordBots.ID = 3`)
                console.log("$ MYSQL: Stats updated.");
                console.log(`$ MYSQL: Time: ${dateTimee}`);
        }
        catch (err) {
                console.log(`$ MYSQL: Error updating stats : ` + err);
        };
setTimeout(updstats, 3600000);
}


function refreshData() {
const activities_list = [
        ``, 
        `${client.users.cache.array().length} Users | ${PREFIX}help`,
        `${client.guilds.cache.array().length} Servers | ${PREFIX}help`, 
        `PrivateRooms.xyz | ${PREFIX}help`,
        ];
        setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
          client.user.setPresence({ activity: { name: activities_list[index], type: "WATCHING"}}).catch(console.error);
      }, 1000); // 360000

setTimeout(refreshData, 360000);
}


const spamchecktime = 6000;

client.on('ready', async () => {
        console.log(`================================================`);
        console.log('# Bot is online!');
        console.log(`# Working on ${client.guilds.cache.array().length} Servers.`);
        console.log(`# Working for ${client.users.cache.array().length} Users.`);
        console.log(`# Current Bot Status: ${client.user.presence.status}.`);
        console.log(`# Current Bot Name: ${client.user.username}`);
        console.log(`================================================`);   
        refreshData();
                    // Connect
                    con.connect(function(err) {
                        if (err) {
                          console.error('$ MYSQL: Error Connecting : ' + err.stack);
                          return;
                        }
                              console.log("$ Connected to DB");
                      });
                updstats(); 
});

const messagee = new Set();

const footerText = `Private Rooms • `Talhasu#0001`
const footerIcon = ('https://images-ext-2.discordapp.net/external/oQDQxsFrQ5oyC8O3U_Tel7MJXkrmSawKFtOnawuTj3U/https/images-ext-2.discordapp.net/external/WkmXB4tLecPn84ExvOOo3hEj79aYajdKC91pe1wzc38/https/cdn.weeb.sh/images/SkKn-xc1f.gif')

client.on('message', async (message) => {
if (!message.content.startsWith(PREFIX) || message.author.bot) return;
let args = message.content.substring(PREFIX.length).split(" ");
  // date:
  var todayy = new Date();
  var datee = todayy.getFullYear()+'-'+(todayy.getMonth()+1)+'-'+todayy.getDate();
  var dtimee = todayy.getHours() + ":" + todayy.getMinutes();
  var dateTimee = datee+' / '+dtimee;

  const newPVCC = message.guild.channels.cache.find(c => c.name == `🔒 ${message.author.username}'s Room`);
  const commandschan = message.guild.channels.cache.find(c => c.name == `commands`)
  const checkchannel = message.guild.channels.cache.find(c => c.name == `Join to create channel`)

  switch(args[0]){
        case 'setup':
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You dont have permission to do that! (``ADMINISTRATOR``)");
        if(checkchannel) return message.channel.send(`Error, this server is already set, if you found any problem please contact `Talhasu#0001, (You see this message because this server already have the necessary channels).`)
        // Pre-Setup the channels
        // Commands embed
        let commands = new Discord.MessageEmbed();
        commands.setTitle("Private Room Commands:");
        commands.setDescription(`
        > **$adduser [@mention]**
        This will give the mentioned user a permission to your room.
        > **$removeuser [@mention]**
        Remove the mentioned user the permission to enter your room.
        > **$setlimit [1-99]**
        Will set the User Limit of your channel.
        > **$Lock**
        will lock your channel to everyone in the server.
        > **$unlock**
        will unlock your channel, means everyone in your channel will have access to your room.
        
        Please use the commands inside this channel.
        
        **Please note:** the bot is still on his initial state, it means there might be some bugs,\nif you find any, please join this server: https://
https://discord.gg/BGFXzZVVJ9/BGFXzZVVJ9 and report them.
        
        Also, there is 5 seconds cooldown when making a private room, and 5 seconds \nslow mode on the commands channel to avoid abusing discord rate limit.`);
        commands.setColor("#ffffff");
        commands.setFooter(footerText, footerIcon);
                // Make Category
                let cate = await message.guild.channels.create('Private Rooms', {type: 'category',});
                // Make commands channel insde the catrgory
                let channel = await message.guild.channels.create('commands', {
                        topic: 'Private room comamnds, please read the pinned embed for more info & commands.',
                        rateLimitPerUser: 5,
                        type: 'text',
                        parent: cate,
                        }).then(embed => embed.send(commands).then((msg) => msg.pin()));

                let channel2 = await message.guild.channels.create('Join to create channel', {
                        type: 'voice',
                        parent: cate,
                });

                let embedD = new Discord.MessageEmbed();
                embedD.setTitle("Setup");
                embedD.setDescription(`> Private Rooms Category:\nThis is where all the private rooms will spawn.\n> Commands Channel:\nThis is where the private room commands will work.\n> Join to create channel:\nas it sound, connect to this channel to create your private channel.\n\n**Note:** Please do NOT delete/edit any channel in that category,\nthe bot is still on his initial state, editing or deleting any channel may will cause bugs.`);
                embedD.setColor("#ffffff");
                embedD.setFooter(footerText, footerIcon);
                message.channel.send(embedD)
console.log(`============
# $SETUP ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;

        case 'help':
                // Shows the commands
                let authorr = '```Talhasu#0001``';
                let mainEmbed = new Discord.MessageEmbed()
                .setTitle(`Private Rooms Information:`)
                .setDescription(`Invite Private Rooms: 
                [discordapp.con/prooms](https://discord.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=)\n  `)
                .setColor("#FFB100")
                .setAuthor(footerText, footerIcon)
                .addField(" • **Commands:**", 
                '• **$help :** ``Showing last updates, commands and stats.``\n• **$adduser [@mention] :** ``Give the mentioned user a permission to your room.``\n• **$removeuser [@mention] :** ``Remove the mentioned user the permission to enter your room.``\n• **$setlimit [1-99] :** ``set the User Limit of your channel.``\n• **$Lock :** ``lock your channel to everyone in the server.``\n• **$Unlock :** ``unlock your channel, means everyone in your channel will have access to your room.``', false)
                .addField(" • **Admin Commands**",
                '• **$setup :** ``First server setup - creating al the the necessary channels.``', false)
                .addField(" • **Updates**", 'None\n', false)
                .addField(" • **Information**",
                `  **Creator:**  ${authorr}.
                 **Support:**  [Server](https://discord.gg/BGFXzZVVJ9)
                  **Main Discord:**  [discord.gg/5ntSbvH](https://discord.gg/BGFXzZVVJ9)
                `, true)
                .addField("<:stats2:725114233217351680> • **Stats**", '    **Servers:** ``'+`${client.guilds.cache.array().length}`+'``\n    **Users:** ``'+`${client.users.cache.array().length}`+'`` \n   **Channels:** ``'+`${client.channels.cache.array().length}`+'``\n8>    **X:** ', true)
                .setFooter(`Information requested by ${message.author.username}`)
                .setTimestamp();
                message.channel.send(mainEmbed);

        break;

        case 'adduser':
                if(message.channel !== commandschan) return message.channel.send(`Please use the command in ${commandschan}`)
                let person = message.guild.member(message.mentions.users.first())
                if(!newPVCC) return message.channel.send("You dont have any Private Voice Channel.");
                if(!person) return message.channel.send("You didnt specify a user!");
                let adduserembed = new Discord.MessageEmbed();
                adduserembed.setTitle(`🔒 ${message.author.username}'s Room`)
                adduserembed.setDescription(`User ${person} is now have access to your room.`);
                adduserembed.setFooter(footerText, footerIcon);
                newPVCC.updateOverwrite(person.id, {
                        CONNECT: true
                });
                message.channel.send(adduserembed);
console.log(`============
# $ADDUSER ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;

        case 'removeuser':
                if(message.channel !== commandschan) return message.channel.send(`Please use the command in ${commandschan}`)
                let person2 = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[1])) 
                if(!newPVCC) return message.channel.send("You dont have any Private Voice Channel.")
                if(!person2) return message.channel.send("You didnt specify a user!")
                let removeuserembed = new Discord.MessageEmbed();
                removeuserembed.setTitle(`🔒 ${message.author.username}'s Room`)
                removeuserembed.setDescription(`User ${person2} have no longer access to your room.`);
                removeuserembed.setFooter(footerText, footerIcon);
                newPVCC.updateOverwrite(person2.id, {
                        CONNECT: false
                      });
                message.channel.send(removeuserembed)
console.log(`============
# $REMVOEUSER ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;

        case 'setlimit':
                if(message.channel !== commandschan) return message.channel.send(`Please use the command in ${commandschan}`)
                if(!newPVCC) return message.channel.send("You dont have any Private Voice Channel.")
                if(!args[1]) return message.channel.send('Error, please specify the user limit.');
                String.prototype.isNumber = function(){return /^\d+$/.test(this);}
                if(!args[1].isNumber()) return message.channel.send(`Error, ${args[1]} Isn't a number.`);
                if(args[1] >= 99) return message.channel.send(`Error, please specify a number between 1 - 99`);
                let limit = args[1]
                let limitembed = new Discord.MessageEmbed();
                limitembed.setTitle(`🔒 ${message.author.username}'s Room`)
                limitembed.setDescription(`Your room user limit is now ${limit}`);
                limitembed.setFooter(footerText, footerIcon);
                newPVCC.setUserLimit(limit)
                message.channel.send(limitembed);
console.log(`============
# $SETLIMIT ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;

        case 'unlock':
                if(message.channel !== commandschan) return message.channel.send(`Please use the command in ${commandschan}`)
                if(!newPVCC) return message.channel.send("You dont have any Private Voice Channel.")
                let unlockedembed = new Discord.MessageEmbed();
                unlockedembed.setTitle(`🔒 ${message.author.username}'s Room`)
                unlockedembed.setDescription(`Your room is now unlocked, \neveryone has access to your room.`);
                unlockedembed.setFooter(footerText, footerIcon);
                newPVCC.updateOverwrite(message.guild.id, {
                        CONNECT: true
                      });
                message.channel.send(unlockedembed);
console.log(`============
# $UNLOCK ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;

        case 'lock':
                if(message.channel !== commandschan) return message.channel.send(`Please use the command in ${commandschan}`)
                if(!newPVCC) return message.channel.send("You dont have any Private Voice Channel.")
                let lockedembed = new Discord.MessageEmbed();
                lockedembed.setTitle(`🔒 ${message.author.username}'s Room`)
                lockedembed.setDescription(`Your room is now locked, \neveryone have no longer access to your room.`);
                lockedembed.setFooter(footerText, footerIcon);
                newPVCC.updateOverwrite(message.guild.id, {
                        CONNECT: false
                      });
                message.channel.send(lockedembed);
console.log(`============
# $LOCK ## ${dateTimee} #
Command By: ${message.member.user.username} | ${message.member.user.id}
Server: ${message.channel.guild.name} | ${message.channel.guild.id}
Server Owner: ${message.channel.guild.owner.user.tag} | ${message.channel.guild.ownerID}
============`);
        break;
}});


client.on('voiceStateUpdate', async (oldMember, newMember) => {
    // date:
    var todayy = new Date();
    var datee = todayy.getFullYear()+'-'+(todayy.getMonth()+1)+'-'+todayy.getDate();
    var dtimee = todayy.getHours() + ":" + todayy.getMinutes();
    var dateTimee = datee+' / '+dtimee;

        const newUserChannel = newMember.channelID;
        const oldUserChannel = oldMember.channelID;

        let userr = await client.users.fetch(newMember.id, { cache: true });
        let userrr = await newMember.guild.members.fetch(newMember.id, { cache: true });
        const userTag = `${userr.username}#${userr.discriminator}`;
        const cmdchan = newMember.guild.channels.cache.find(c => c.name == `commands`)

        const openVC = oldMember.guild.channels.cache.find(c => c.name == `Join to create channel`);
        const newPVCC = oldMember.guild.channels.cache.find(c => c.name == `🔒 ${userr.username}'s Room`);

        if(!openVC) return
        //if(!newPVCC) return
        if(newUserChannel === openVC.id) {
            if(newPVCC) await newPVCC.delete();
            if(newPVCC) return
            //return cmdchan.send(`[Error] ${userr}, Your room is already exist, please remove / join->leave your room to make a new one.`)
        let category = newMember.guild.channels.cache.find(c => c.name == "Private Rooms" && c.type == "category");
        setTimeout(async () => {

            const newPVC = await newMember.guild.channels.create(`🔒 ${userr.username}'s Room`, {
                type: 'voice',
                parent: category,
                permissionOverwrites: [
                    {
                        allow: 'CONNECT',
                        id: userr.id
                    },
                    {
                        deny: 'CONNECT',
                        id: newMember.guild.id
                    }
                ],
            });
                await userrr.voice.setChannel(newPVC).catch(err => console.log(err));
                await openVC.updateOverwrite(userr.id, {
                CONNECT: false
              });
        }, 10);

        cmdchan.send(`[Rate-Limit] ${userr}, Thanks for creating a private room, please wait 5 seconds before trying to create a new private room.`)
        setTimeout( () => {
        openVC.updateOverwrite(userr.id, {
            CONNECT: true
          });
    }, spamchecktime);

console.log(`============
# NEW ROOM ## ${dateTimee} #
User: ${userr.username} | ${userr.id}
Server: ${newMember.guild.name} | ${newMember.guild.id}
Server Owner: ${newMember.guild.owner.user.tag} | ${newMember.guild.ownerID}
============`);
              // THIS
              let commandss = new Discord.MessageEmbed();
              commandss.setTitle("Thanks for creating a private room!");
              commandss.setDescription(`**Commands:**
> **$adduser [@mention]**
This will give the mentioned user a permission to your room.
> **$removeuser [@mention]**
Remove the mentioned user the permission to enter your room.
> **$setlimit [1-99]**
Will set the User Limit of your channel.
> **$Lock**
will lock your channel to everyone in the server.
> **$unlock**
will unlock your channel, means everyone in your channel will have access to your room.
Please use the commands inside this channel.
**Please note:** the bot is still on his initial state, it means there might be some bugs,\nif you find any, please join this server: https://discord.gg/BGFXzZVVJ9 and report them.
Also, there is 5 seconds cooldown when making a private room, and 5 seconds \nslow mode on the commands channel to avoid abusing discord rate limit.
`);
                commandss.setColor("#ffffff");
                commandss.setFooter(footerText, footerIcon);

                //setTimeout(async () => {
                //        await spam.delete(userr.id);
                //      }, 5000);

                if(messagee.has(userr.id)) return
                await userr.send(commandss);
                await messagee.add(userr.id);
        }
        else if(newPVCC) {
        if(oldUserChannel == newPVCC.id && newUserChannel !== newPVCC.id) {
            await newPVCC.delete();

console.log(`============
# REMOVE ROOM ## ${dateTimee} #
User: ${userr.username} | ${userr.id}
Server: ${newMember.guild.name} | ${newMember.guild.id}
Server Owner: ${newMember.guild.owner.user.tag} | ${newMember.guild.ownerID}
============`);
        }}
});

client.on("guildCreate", async guild => {
  // date:
  var todayy = new Date();
  var datee = todayy.getFullYear()+'-'+(todayy.getMonth()+1)+'-'+todayy.getDate();
  var dtimee = todayy.getHours() + ":" + todayy.getMinutes();
  var dateTimee = datee+' / '+dtimee;
console.log(`============
# NEW GUILD ## ${dateTimee} #
Server: ${guild.name} | ${guild.id}
Server Owner: ${guild.owner.user.tag} | ${guild.ownerID}
============`);
});

client.on("guildCreate", guild => {
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
        channel.send("Thanks for inviting me! In order to setup the private rooms, please use the command ``$setup``.\nplease use the command ``$help`` for general info, commands, and stats, or visit my website at https://PrivateRooms.xyz \nand https://docs.PrivateRooms.xyz for detailed information.")
 console.log(`Server: ${guild} | Server Owner: ${guild.owner.user.tag} - ${guild.owner} - ${guild.ownerID} | Channels: ${guild.channels.cache.array().length} | Servers: ${client.guilds.cache.array().length} | First Message: ${channel}`)

}); 
