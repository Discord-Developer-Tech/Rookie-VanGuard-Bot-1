require("module-alias/register"); // Module for organization
console.log('Module Alias Loaded...');
// ==================================================
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/Core/cloud.html');
});
app.listen(3000, () => console.log(`Booting Up!`));
// ==================================================
const config = require('./Core/config.json'); // Configuration file for the bot 
// ==================================================
const Aoijs = require('aoi.js'); 
const Discord = require('discord.js'); // Scripting language
// ==================================================
console.log('Linked to config.json and ready to be 24/7!');
// ==================================================
//const mongoose = require('mongoose');
//const mongo = require('dbdjs.mongo').default;
//const mongoURL = config.mongoURL;
//mongoose.connect(mongoURL, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  //keepAlive: true
//});
//mongo.createModel('main');
//console.log('Mongoose Loaded...');
// ==================================================
const bot = new Aoijs.Bot({
token: "ODQyMTU0MTQ5MjgxNTI5OTI2.YJxLKw.UeHMPJMGxCeEzYM2giqVo24rPhM",
prefix: config.prefix,
autoUpdate: false,
applicationCache: true,
fetchInvites: true,
connectedBots: true,
mobile: true, 
suppressAll: true,
errorMessage: "",
  //database: mongo
    // database: mongo
});
// ==================================================
const disbut = require('discord-buttons')
disbut(bot.client)
//Allows to execute Command
// ==================================================
console.log('Running aoi.js'); // Confirms Aoi.js connection
// ==================================================
// const fetch = require('node-fetch'); // Node manager
// ==================================================
// Util handler
try {
	require(".u").load(bot, 'utils')
} catch (e) {
	console.log(`${e}`.red)
}
// ==================================================
bot.onMessage({
  guildOnly: false,

  respondToBots: false// commands will work in dms. set "true" for commands to work in guilds only
});
bot.loadCommands('./Commands/');

// ==================================================
//Commands which I was too lazy to file lol
bot.command({
name:"eval",
code:`$eval[$message]
$onlyforids[$botownerid;]`})
bot.command({
name:"update",
code:`$updatecommands
$addcmdreactions[$customemoji[check]]
Success!
$onlyforids[$botownerid;]`})
bot.command({
name:"$alwaysExecute",
code:`$if[$ismentioned[$clientid]==true]
$eval[$getvar[about]]
$cooldown[10s;]
$onlyif[$replacetext[$replacetext[$message;<@$clientid>;];<@!$clientid>;]==;]
$endif
$if[$checkcondition[$commandinfo[$replacetext[$message[1];$getservervar[prefix];;1];name]!=log-channel]$checkcondition[$commandinfo[$replacetext[$message[1];$getservervar[prefix];;1];name]!=eval]$checkcondition[$commandinfo[$replacetext[$message[1];$getservervar[prefix];;1];name]!=]==truetruetrue]
$channelsendmessage[$getvar[channel];{author:My command was used!}{title:$usertag used my command!}{field:User:<@$authorid>:no}{field:Server:$servername($guildid):no}{field:Command Used:$commandinfo[$replacetext[$message[1];$getservervar[prefix];;1];name]:no}{field:Message Ahead:$replacetext[$replacetext[$checkcondition[$replacetext[$message;$message[1];]==];true;None];false;**$replacetext[$message;$message[1];;1]**]:no}{footer:ID#COLON# $authorid}{timestamp}{color:RANDOM}{thumbnail:$authoravatar};no]
$suppresserrors
$onlyif[$splittext[1]==$getservervar[prefix];]
$textsplit[$message[1];]
$endif`})
bot.command({
name:"log-channel",
code:`$setvar[channel;$mentionedchannels[1]]
$onlyif[$mentionedchannels[1]!=;Mention a channel!]
$onlyforids[$botownerid;]`})


bot.command({
name:"$alwaysExecute",
code:`$if[$getchannelvar[topener]!=]
$setchannelvar[tscript;$getchannelvar[tscript]$usertag at $hour:$minute:$second(GMT)\n$message\n\n]
$setmessagevar[author;$authorid;$messageid]
$else
$endif
$setmessagevar[author;$authorid;$messageid]`})

bot.interactionCommand({
name:"hit",
prototype:"button",
code:`$if[$getuservar[lh]==$authorid]
$interactionreply[;{description:It is <@$getuservar[op]>'s chance to play!}{color:FF0000}{delete:3s};;64]
$elseif[$getuservar[lh]!=$authorid]
$if[$checkcondition[$sub[$getuservar[hp;$getuservar[op]];$random[10;20]]<0]$checkcontains[$sub[$getuservar[hp;$getuservar[op]];$random[10;20]];-]==truetrue]
$setuservar[op;]
$setuservar[fmid;;$getuservar[op]]
$setuservar[fmid;]
$deletemessage[$getuservar[fmid]]
$setuservar[op;;$getuservar[op]]
$sendmessage[{author:Game Over!}{description:With just $getuservar[hp] health remaining, <@$authorid> won from <@$getuservar[op]>! GG!}{color:00FF00}{footer:Congrats on the win!}{thumbnail:$authoravatar}{image:https#COLON#//media3.giphy.com/media/2gtoSIzdrSMFO/giphy.gif};no]
$else
$interactionReply[<@$getuservar[op]>;{author:Current Scores After The Heal}{field:$username:$getuservar[hp]:yes}{field:$username[$getuservar[op]]:$getuservar[hp;$getuservar[op]]:yes}{field:Now It Is The Chance Of:<@$getuservar[op]>}{color:$random[11111;999999]}{thumbnail:$authoravatar}{footer:Damage Given#COLON# $random[10;20]};{actionRow:Punch,2,4,hit,:Heal,2,3,heal,:End,2,2,end};0;7]
$setuservar[lh;$authorid]
$setuservar[lh;$authorid;$getuservar[op]]
$setuservar[hp;$sub[$getuservar[hp;$getuservar[op]];$random[10;20]];$getuservar[op]]
$endif
$endelseif
$endif
$onlyif[$getuservar[op]!=;]`})
bot.interactionCommand({
name:"end",    
prototype:"button",
code:`$setuservar[op;]
$setuservar[fmid;;$getuservar[op]]
$setuservar[fmid;]
$deletemessage[$getuservar[fmid]]
$setuservar[op;;$getuservar[op]]
$sendmessage[{author:Game Ended!}{description:With $getuservar[hp] health remaining, <@$authorid> decided to surrender to <@$getuservar[op]>! Congrats **$usertag[$getuservar[op]]**!}{color:00FF00}{footer:Congrats on the win!}{thumbnail:$useravatar[$getuservar[op]]};no]`})
bot.interactionCommand({
name:"heal",    
prototype:"button",
code:`$if[$getuservar[lh]==$authorid]
$interactionreply[;{description:It is <@$getuservar[op]>'s chance to play!}{color:FF0000}{delete:3s};;64]
$elseif[$getuservar[lh]!=$authorid]
$interactionReply[<@$getuservar[op]>;{author:Current Scores After The Heal}{field:$username:$getuservar[hp]:yes}{field:$username[$getuservar[op]]:$getuservar[hp;$getuservar[op]]:yes}{field:Now It Is The Chance Of:<@$getuservar[op]>}{color:$random[11111;999999]}{thumbnail:$authoravatar}{footer:Amount Healed#COLON# $random[10;20]};{actionRow:Punch,2,4,hit,:Heal,2,3,heal,:End,2,2,end};0;7]
$setuservar[lh;$authorid]
$setuservar[lh;$authorid;$getuservar[op]]
$setuservar[hp;$sum[$getuservar[hp];$random[10;20]]]
$endelseif
$endif
$onlyif[$getuservar[op]!=;]`})


bot.reactionAddCommand({
channel:"$channelid",
code:`$if[$getuservar[cmid]==1]
$setuservar[cmid;]
$setservervar[cemoji;$getservervar[cemoji]$emojitostring.]
$awaitmessages[$authorid;1m;everything;ny;Time up! Use **$getservervar[prefix]create-rr** if you want to start again!]
$customemoji[$getvar[createrr]] **New Group - Extra Part**
Would you like to add another role, or not? Please enter **__yes__** OR **__no__**.
$elseif[$getuservar[armid]==1]
$setuservar[armid;]
$setservervar[aremoji;$emojitostring]
$awaitmessages[$authorid;1m;everything;armid;Time up! Use **$getservervar[prefix]create-rr** if you want to start again!]
$customemoji[$getvar[createrr]] **Existing RR - Message ID [Part 3/3]**
**Please enter the ID of the message you want to add this RR to. Note that the message should be from this channel, if not, try mentioning the channel and entering the message ID too!** Also note that the message should have an RR already, or you would have to execute this again!
$endelseif
$else
$endif
$onlyif[$isbot[$authorid]==false;]`})
bot.reactionAddCommand({
channel:"$channelid",
code:`$if[$getmessagevar[brole]!=a]
$djsEval[channel.messages.fetch(message.id).then(d=>d.reactions.cache.find(x=>x.emoji.toString() === "$emojitostring").users.remove(author.id))] 
$senddm[$authorid;**$servername:** Could not give you the role because you have a blacklisted role needed for that role!]
$onlyif[$hasanyrole[$authorid;$joinsplittext[;]]==true;{execute:gr}]
$textsplit[$getmessagevar[brole];.]
$else
$if[$getmessagevar[arole]!=a]
$djsEval[channel.messages.fetch(message.id).then(d=>d.reactions.cache.find(x=>x.emoji.toString() === "$emojitostring").users.remove(author.id))] 
$senddm[$authorid;**$servername:** You do not have the role required to obtain this role!]
$onlyif[$hasanyrole[$authorid;$joinsplittext[;]]]==false;{execute:gr}]
$textsplit[$getmessagevar[arole];.]
$else
$giverole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;You successfully recieved the role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]**, since you reacted to $emojitostring in the server **$servername**!]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$highestrole[$authorid]];{execute:uar}]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]];{execute:nr}]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$endif
$endif
$onlyif[$checkcontains[$getmessagevar[emoji];$emojitostring]==true;]
$onlyif[$isbot[$authorid]==false;]`})
bot.awaitedCommand({
name:"nr",
code:`$senddm[$authorid;**$servername:** Failed to assign the role, since its above me! Kindly report this to an admin so they can put me above them!]`})
bot.awaitedCommand({
name:"uar",
code:`$senddm[$authorid;**$servername:** Failed to assign the role, since your highest role is above me!]`})
bot.awaitedCommand({
name:"gr",
code:`$giverole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;You successfully recieved the role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]**, since you reacted to $emojitostring in the server **$servername**!]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$highestrole[$authorid]];{execute:uar}]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]];{execute:nr}]`})
bot.reactionRemoveCommand({
channel:"$channelid",
code:`$takerole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;Your role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]** was taken from you, since you un-reacted to $emojitostring in the server **$servername**!]
$onlyif[$hasrole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]==true;]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$onlyif[$checkcontains[$getmessagevar[emoji];$emojitostring]==true;]
$onlyif[$getmessagevar[role]!=;]
$onlyif[$isbot[$authorid]==false;]`})
bot.onReactionRemove()
// the end now everything should work 
bot.reactionAddCommand({
channel:"$channelid",
code:`$if[$getuservar[cmid]==1]
$setuservar[cmid;]
$setservervar[cemoji;$getservervar[cemoji]$emojitostring.]
$awaitmessages[$authorid;1m;everything;ny;Time up! Use **$getservervar[prefix]create-rr** if you want to start again!]
$customemoji[$getvar[createrr]] **New Group - Extra Part**
Would you like to add another role, or not? Please enter **__yes__** OR **__no__**.
$elseif[$getuservar[armid]==1]
$setuservar[armid;]
$setservervar[aremoji;$emojitostring]
$awaitmessages[$authorid;1m;everything;armid;Time up! Use **$getservervar[prefix]create-rr** if you want to start again!]
$customemoji[$getvar[createrr]] **Existing RR - Message ID [Part 3/3]**
**Please enter the ID of the message you want to add this RR to. Note that the message should be from this channel, if not, try mentioning the channel and entering the message ID too!** Also note that the message should have an RR already, or you would have to execute this again!
$endelseif
$else
$endif
$onlyif[$isbot[$authorid]==false;]`})
bot.reactionAddCommand({
channel:"$channelid",
code:`$if[$getmessagevar[brole]!=a]
$djsEval[channel.messages.fetch(message.id).then(d=>d.reactions.cache.find(x=>x.emoji.toString() === "$emojitostring").users.remove(author.id))] 
$senddm[$authorid;**$servername:** Could not give you the role because you have a blacklisted role needed for that role!]
$onlyif[$hasanyrole[$authorid;$joinsplittext[;]]==true;{execute:gr}]
$textsplit[$getmessagevar[brole];.]
$else
$if[$getmessagevar[arole]!=a]
$djsEval[channel.messages.fetch(message.id).then(d=>d.reactions.cache.find(x=>x.emoji.toString() === "$emojitostring").users.remove(author.id))] 
$senddm[$authorid;**$servername:** You do not have the role required to obtain this role!]
$onlyif[$hasanyrole[$authorid;$joinsplittext[;]]]==false;{execute:gr}]
$textsplit[$getmessagevar[arole];.]
$else
$giverole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;You successfully recieved the role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]**, since you reacted to $emojitostring in the server **$servername**!]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$highestrole[$authorid]];{execute:uar}]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]];{execute:nr}]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$endif
$endif
$onlyif[$checkcontains[$getmessagevar[emoji];$emojitostring]==true;]
$onlyif[$isbot[$authorid]==false;]`})
bot.awaitedCommand({
name:"nr",
code:`$senddm[$authorid;**$servername:** Failed to assign the role, since its above me! Kindly report this to an admin so they can put me above them!]`})
bot.awaitedCommand({
name:"uar",
code:`$senddm[$authorid;**$servername:** Failed to assign the role, since your highest role is above me!]`})
bot.awaitedCommand({
name:"gr",
code:`$giverole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;You successfully recieved the role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]**, since you reacted to $emojitostring in the server **$servername**!]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$highestrole[$authorid]];{execute:uar}]
$onlyif[$roleposition[$highestrole[$clientid]]>$roleposition[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]];{execute:nr}]`})
bot.reactionRemoveCommand({
channel:"$channelid",
code:`$takerole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]
$senddm[$authorid;Your role **$rolename[$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]** was taken from you, since you un-reacted to $emojitostring in the server **$servername**!]
$onlyif[$hasrole[$authorid;$advancedtextsplit[$getmessagevar[role];.;$findtextsplitindex[]]]==true;]
$textsplit[$replacetext[$getmessagevar[emoji];$emojitostring;];.]
$onlyif[$checkcontains[$getmessagevar[emoji];$emojitostring]==true;]
$onlyif[$getmessagevar[role]!=;]
$onlyif[$isbot[$authorid]==false;]`})
bot.onReactionRemove()
// the end now everything should work 
 bot.onInteractionCreate()


bot.command({
name: "$alwaysExecute",
code: `
$if[$stringStartsWith[$message[1];$getServervar[prefix]]==true]

$setGlobalUserVar[birb_thirst;$sub[$getGlobalUserVar[birb_thirst];2]]

$setGlobalUserVar[birb_sleep;$sub[$getGlobalUserVar[birb_sleep];2]]

$setGlobalUserVar[birb_love;$sub[$getGlobalUserVar[birb_love];2]]

$setGlobalUserVar[birb_hungry;$sub[$getGlobalUserVar[birb_hungry];2]]

$onlyIf[$getGlobalUserVar[birb]>=1;]
$onlyIf[$getGlobalUserVar[birb_thirst]>0;]
$onlyIf[$getGlobalUserVar[birb_sleep]>0;]
$onlyIf[$getGlobalUserVar[birb_love]>0;]
$onlyIf[$getGlobalUserVar[birb_hungry]>0;]
$endif
$globalCooldown[5s;]
`
})

bot.command({
name: "$alwaysExecute",
code: `
$if[$randomText[1;1;1;1;1;1;1;1;1;1;1;4]==4]
$awaitMessages[everyone;60s;Sheeesh;birb3;Command Timed out]
**Oh someones <:birdy:913155711339495474> is making it rain $getServerVar[simbol] type in the following sentence to claim**
\`sheeesh\`
$onlyIf[$getGlobalUserVar[birb]>=1;]
$else
$if[$randomText[1;1;1;1;1;1;1;1;1;1;1;4]==1]
$setVar[pfp;aaaaaaa]
$endif
$endif
`
})


bot.awaitedCommand({
name: "birb3",
code: `
**$username claimed it first birb dropped**

<:waterrr:913155906408177755> $random[1;10]x
<:birdyname:913156358025662464> $randomText[ImLegendaryBirb;BerkTheSword;NeverLandish;ColdHearted;CallMeBirb;@#$;ThisIs$;CallOfBirb$;RareLife$%%] 
$getServerVar[simbol] $random[10;1000]x

$setGlobalUserVar[birb_water;$sum[$getGlobalUserVar[birb_water];$random[1;10]]]

$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[10;1000]]]

$setGlobalUserVar[birb_name;$randomText[ImLegendaryBirb;BerkTheSword;NeverLandish;ColdHearted;CallMeBirb;@#$;ThisIs$;CallOfBirb$;RareLife$%%]]` })


bot.awaitedCommand({
name: "birb2",
code: `
**$username claimed it first birb dropped**

<:waterrr:913155906408177755> $random[1;10]x

$getServerVar[simbol] $random[10;1000]x

$setGlobalUserVar[birb_water;$sum[$getGlobalUserVar[birb_water];$random[1;10]]]

$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[10;1000]]]

` })


bot.awaitedCommand({
name: "birb1",
code: `
**$username claimed it first birb dropped**

<:waterrr:913155906408177755> $random[1;10]x

$getServerVar[simbol] $random[10;1000]x

$setGlobalUserVar[birb_water;$sum[$getGlobalUserVar[birb_water];$random[1;10]]]

$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[10;1000]]]`

})



bot.command({
name: "scavenge",
code: `
$if[$random[1;3]==1]
$awaitMessages[$authorid;45s;store,basement,bus;place1,place2,place3;command timed out]

**$username please select somewhere to search**
\`store\` \`basement\` \`bus\`
$else
$if[$random[1;3]==2]

$awaitMessages[$authorid;45s;water,tree,car;place11,place22,place33;command timed out]

**$username please select somewhere to search**
\`water\` \`tree\` \`car\`
$else
$if[$random[1;3]==3]

$awaitMessages[$authorid;45s;nuts,street,dms;place11,place22,place33;command timed out]

**$username please select somewhere to search**
\`nuts\` \`street\` \`dms\`
$endif
$endif
$endif
`})

bot.awaitedCommand({
name: "place1",
code: ` **You went searching in the grocery store and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place2",
code: `**You went searching in your basement and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place3",
code: ` **You went searching in your bus and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})







bot.awaitedCommand({
name: "place11",
code: ` **You went searching in some water and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place22",
code: `**You went searching in your big tree found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place33",
code: ` **You went searching in someones car found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})










bot.awaitedCommand({
name: "place111",
code: ` **You went searching in someones nuts wtf and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place222",
code: `**You went searching at the streets and found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})

bot.awaitedCommand({
name: "place333",
code: ` **You went searching in your Dms with $userTag[$randomUserId] found** \`$random[10;250]\`$getServerVar[simbol]
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[1;250]]]`})










bot.botJoinCommand({
channel: "$randomChannelID",
code: `$author[$username[$clientid];$userAvatar[$clientid]]
$thumbnail[$replaceText[$servericon;null;$userAvatar]]
$color[BLUE]
$description[**$username[$clientid]** 
$username[$clientid] is a discord economy discord bot
$username[$clientid] offers 
<:badge3:903014250493116428> Badge system

<:banknote:901866414158250055> Promocodes :eyes:

<:looott:901640510458974238> Lottery system 

<:kick:904339194044874782> Music

<:levels:904340614030716988> Economy

my prefix is \`$\` i was created by \`$userTag[$botownerid]\` if u found an error run the command $bugreport to report a serious bug
]`})


bot.command({
name: "firstmessage",
aliases: ["fm"],
code: `
$author[$userTag[$getMessage[$get[ch];$get[msgID];userID]];$userAvatar[$getMessage[$get[ch];$get[msgID];userID]]]
$description[
$getMessage[$get[ch];$get[msgID];content]
[Jump To The First Message]($get[link])]
$addtimestamp[$get[timestamp]]
$let[timestamp;$djsEval[d.client.channels.cache.get('$get[ch]').messages.cache.get('$get[msgID]').createdTimestamp;yes]
$color[RANDOM]
$footer[In $channelName[$get[ch]]]
$let[link;https://discord.com/channels/$guildID/$get[ch]/$get[msgID]]
$let[msgID;$firstMessageID[$get[ch]]]
$let[ch;$findChannel[$message[1]];yes]]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
});


bot.command({
 name: "lb",
 aliases: ['leaderboard','lboard','leaderb'],
 code:`
 $if[$message==cash]
 $description[$globalUserLeaderboard[cash;asc;{top} - {username} - {value} $getServerVar[simbol]]]
 $title[This is the wallet lb]
 $color[RANDOM]
 $else
 $if[$message==wallet]
 $description[$globalUserLeaderboard[cash;asc;{top} - {username} - {value} $getServerVar[simbol]]]
 $title[This is the wallet lb]
 $color[RANDOM]
 $else
 $if[$message==money]
 $description[$globalUserLeaderboard[cash;asc;{top} - {username} - {value} $getServerVar[simbol]]]
 $title[This is the wallet lb]
 $color[RANDOM]
 $else
 $if[$message==evil]
 $description[$globalUserLeaderboard[evil;asc;{top} - {username} - {value} $getServerVar[ssimbol]]]
 $title[This is the souls lb]
 $color[RANDOM]
 $else
 **Uhm invalid argument you can only choose from**: \`cash\`,\`wallet\`,\`money\`,\`evil
 \`
 $endif
 $endif
 $endif
 $endif`
})

  
bot.command({
  name: "stats",
  cooldown: "3s",
  code: `$color[$getVar[color]]
$addField[Size Database;> $cropText[$fileSize[$getVar[database];kb];5]KB;yes]
$addField[Size Server;> $cropText[$numberSeparator[$multi[$get[sizeserver];8];.];5]KB;yes]
$addField[Size Code;> $cropText[$fileSize[$getVar[file];kb];5]KB;yes]
$addField[Command;> $numberSeparator[$commandsCount];yes]
$addField[Server;> $numberSeparator[$serverCount];yes]
$addField[Members;> $numberSeparator[$allMembersCount];yes]
$addField[RAM Left;> $cropText[$divide[$sub[$maxRam;$ram];1024];4]GB;yes]
$addField[RAM;> $cropText[$divide[$ram;1024];4]GB;yes]
$addField[CPU;> $cropText[$cpu;4]%;yes]
$addField[Is Deafen/Mute;> $replaceText[$isDeafened[$clientID];null;false]-$isSelfDeafened[$clientID] / $replaceText[$isMuted[$clientID];null;false]-$isSelfMuted[$clientID];yes]
$addField[Is Playing;> $checkCondition[$queueLength!=0];yes]
$addField[Is Connect;> $checkCondition[$voiceID[$clientID]!=];yes]
$addField[API Ping;> $numberSeparator[$botPing]ms;yes]
$addField[DB Ping;> $numberSeparator[$dbPing]ms;yes]
$addField[WS Ping;> $numberSeparator[$ping]ms;yes]
$addField[Platform;> $djsEval[require ('os').platform();yes];yes]
$addField[Last Online;> <t:$cropText[$getVar[last];10]:R>;yes]
$addField[Uptime;> $client[readytimestamp];yes]
$footer[Ver. $packageVersion ($nodeVersion);$userAvatar[$authorID;512]]
$thumbnail[$userAvatar[$clientID]]
$addTimestamp
$let[sizeserver;$charCount[$serverNames[]]]
$cacheMembers
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[stats;cooldown];Please wait **%time%** before using again.]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
});

bot.command({
  name: "ping",
  cooldown: "3s",
  code: `$title[$userTag[$client ID;https://lllll.com]
$color[CYAN]
$addTimeStamp
$description[
\`\`\`
Websocket Ping   : $numberSeparator[$ping]ms
API       Ping   : $numberSeparator[$botPing]ms
Database  Ping   : $numberSeparator[$dbPing]ms
Message   Ping   : $executionTimems
Shard     Ping   : $numberSeparator[$sub[$dateStamp;$get[stamp]]]ms $wait[$dbping] $let[stamp;$dateStamp]
Average   Ping   : $numberSeparator[$truncate[$divide[$sum[$ping;$botPing;$dbPing];3]]]ms
\`\`\`\] 
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[ping;cooldown];Please wait **%time%** before using again.]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
});

bot.command({
 name: "$alwaysExecute",
 code: `
$channelSendMessage[$getGlobalUserVar[channel;$getGlobalUserVar[user]];<:ann:903452719895969823> **$userTag[$authorid]**: $message]

$onlyIf[$getGlobalUserVar[chat]==true;]

`
 })

bot.command({
 name: "joincall",
 code: `
$if[$getVar[match]==]
$sendMessage[Join matchmaking please wait till someone else connects...;no]
$setVar[match;$authorID]
$setGlobalUserVar[channel;$channelID]
$else
$sendMessage[Match!;no]
$sendMessage[Join matchmaking please wait till someone else connects...;no]
$setVar[match;]
$channelSendMessage[$getGlobalUserVar[channel;$getVar[match]];Match!]
$setGlobalUserVar[chat;true;$getVar[match]]
$setGlobalUserVar[chat;true]
$setGlobalUserVar[user;$authorID;$getVar[match]]
$setGlobalUserVar[user;$getVar[match]]
$setGlobalUserVar[channel;$channelID]
$endif
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]
`})

bot.command({
 name: "leavecall",
 code: `
$setGlobalUserVar[user;] 
$setGlobalUserVar[chat;false;$getGlobalUserVar[user]]
$setGlobalUserVar[chat;false]
$setGlobalUserVar[user;;$getGlobalUserVar[user]]
$setGlobalUserVar[channel;$getGlobalUserVar[user]]
$setGlobalUserVar[channel;]
$sendMessage[Call Ended!;no]
$channelSendMessage[$getGlobalUserVar[channel;$getGlobalUserVar[user]];Call Ended!]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]
`})

bot.command({
  name: "uptime",
  cooldown: "3s",
  code: `\`\`\`
ive been on for $uptime
\`\`\`
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[uptime;cooldown];Please wait **%time%** before using again.]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
});

bot.command({
name:"bgstart",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (ENDED) 🎉:}{thumbnail:https://media.discordapp.net/attachments/896847103647694862/900376604935606292/ffff.gif?width=147&height=147}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won **$get[prize]**;no]
$onlyif[$getmessagevar[ended]==false;]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$wait[$get[time]]
$setmessagevar[endstamp;$get[endstamp];$get[e]]
$setmessagevar[hoster;$authorid;$get[e]]
$setmessagevar[prize;$get[prize];$get[e]]
$let[e;$apimessage[$channelid;;{author:🎉 GIVEAWAY 🎉:}{thumbnail:https://media.discordapp.net/attachments/896847103647694862/900376604935606292/ffff.gif?width=147&height=147}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**No one** has joined this giveaway}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE};{actionRow:🎊 Join 🎊,2,3,join:🔁 Reroll 🔁,2,1,reroll:🔚 End 🔚,2,4,end};;yes]]
$let[endstamp;$sum[$datestamp;$ms[$get[time]]]]
$let[prize;$messageslice[1]]
$onlyif[$ms[$get[time]]!=undefined;Invalid time provided]
$let[time;$message[1]]
$onlyif[$message[2]!=;Enter a time and a prize]
$onlyIf[$getGlobalUserVar[prem;$authorID]==true;**⛔ You need \`premium\` to use this command**]`
})
bot.interactionCommand({
name:"join",
prototype:"button",
code:` $editmessage[$get[msg];{author:🎉 GIVEAWAY 🎉:}{thumbnail:https://media.discordapp.net/attachments/896847103647694862/900376604935606292/ffff.gif?width=147&height=147}{title:$get[prize]}{description:**Hosted By#COLON#** <@$get[host]>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users have participated in this giveaway.}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE}]
$setmessagevar[joinedusers;$getmessagevar[joinedusers;$get[msg]]$authorid@;$get[msg]]
$setmessagevar[joined;$get[participated];$get[msg]]
$onlyif[$get[condition]==false;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];false;Joined the giveaway];true;You have already joined the giveaway];ended;The giveaway ended];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;ended];false;$get[condition]]]
$let[condition;$checkcontains[$getmessagevar[joinedusers;$interactiondata[message.id]];$authorid]]
$let[participated;$sum[$getmessagevar[joined;$get[msg]];1];$get[msg]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"reroll",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (REROLLED) 🎉:}{thumbnail:https://media.discordapp.net/attachments/896847103647694862/900376604935606292/ffff.gif?width=147&height=147}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Reroll:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the reroll of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Rerolled the giveaway];true;This giveaway has not ended yet];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;$replacetext[$replacetext[$get[condition];true;perform];false;false]];false;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"end",
prototype:"button",
code:`$editmessage[$get[e];{author:🎉 GIVEAWAY (FORCE ENDED) 🎉:}{thumbnail:https://media.discordapp.net/attachments/896847103647694862/900376604935606292/ffff.gif?width=147&height=147}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Force End:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}]
$sendmessage[Congratulations <@$get[winner]>! You won the giveaway(force ended) of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Ended the giveaway];true;This giveaway has already ended];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];false;$replacetext[$replacetext[$get[condition];true;perform];false;false]];true;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})

bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Your mythical gem expired!]
 $setGlobalUserVar[gem2on;off;$timeoutData[userID]]`
})




bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Your Silver gem expired!]
 $setGlobalUserVar[gem1on;off;$timeoutData[userID]]`
})

bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Your laser boost has just run out!]
 $setGlobalUserVar[lasere;false;$timeoutData[userID]]`
})

bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Your premium has just run out!]
 $setGlobalUserVar[premium;false;$timeoutData[userID]]`
})



bot.timeoutCommand({
 code: `
 $sendDM[$timeoutData[userID];Oh no Your passive mode ran out !]
 $setGlobalUserVar[passive;false;$timeoutData[userID]]`
})




bot.command({
name: "ccadd",
code: `
$setservervar[ccmd;$replacetext[$replacetext[$checkcondition[$getservervar[ccmd]!=];false;$tolowercase[$message[1]]/];true;$getservervar[ccmd]$tolowercase[$message[1]]/]]
$setservervar[cdes;$getservervar[cdes]$messageslice[1;10]/]
Successfully added $replacetext[$replacetext[\`$tolowercase[$message[1]]\`;#right_click#;>];#left_click#;<] to the commands list, type \`$getservervar[prefix]cclist\` to see all available commands
$onlyif[$findtextsplitindex[$tolowercase[$message[1]]]==0;{description:Command \`$tolowercase[$message[1]]\` is available in the command list}{color:ff2050}]
$textsplit[$getservervar[ccmd];/]
$onlyif[$checkcontains[$message;#RIGHT#;#LEFT#;#RIGHT_BRACKET#;#LEFT_BRACKET#;/]==false;{description:Please don't use it \`symbol\` for trigger and response}{color:ff2050}]
$argscheck[>2;{description:Correct use \n\`\`\`\n$getservervar[prefix]ccadd <trigger> <response>\n\`\`\`}{color:ff2050}]
$onlyperms[manageserver;{description:You have no permissions for \`MANAGE_SERVER\`}{color:ff2050}{timestamp}]
$onlyIf[$getGlobalUserVar[prem;$authorID]==true;**⛔ You need \`premium\` to use this command**]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
})


bot.command({
name: "ccdel",
code: `
$setservervar[ccmd;$replacetext[$getservervar[ccmd];$advancedtextsplit[$getservervar[ccmd];/;$findtextsplitindex[$tolowercase[$message]]]/;]]
$setservervar[cdes;$replacetext[$getservervar[cdes];$advancedtextsplit[$getservervar[cdes];/;$findtextsplitindex[$tolowercase[$message]]]/;]]
Successfully cleared command $replacetext[$replacetext[\`$tolowercase[$message[1]]\`;#right_click#;>];#left_click#;<]
$onlyif[$findtextsplitindex[$tolowercase[$message]]!=0;{description:Command \`$tolowercase[$message]\` not available in the command list}{color:ff2050}]
$textsplit[$getservervar[ccmd];/]
$onlyif[$checkcontains[$message;#RIGHT#;#LEFT#;#RIGHT_BRACKET#;#LEFT_BRACKET#;/]==false;{description:Please don't use it \`symbol\` for trigger and response}{color:ff2050}]
$argscheck[>1;{description:Correct use \n\`\`\`\n$getservervar[prefix]ccdel <trigger>\n\`\`\`}{color:ff2050}]
$onlyperms[manageserver;{description:You have no permissions for \`MANAGE_SERVER\`}{color:ff2050}{timestamp}]
$onlyIf[$getGlobalUserVar[prem;$authorID]==true;**⛔ You need \`premium\` to use this command**]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
}) 

bot.command({
name: "cclist",
code: `
$title[**__Custom Commands__**]
$color[RANDOM]
$thumbnail[https://images-ext-2.discordapp.net/external/swRdKls7P6ywC1LugeV80TdPKLPFPKI_9XRttmdAjRU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/899810192621961216/385798d1182bf64e110229bc560c3d75.webp?width=421&height=421]
$description[\`$replacetext[$replacetext[$replacetext[$getservervar[ccmd];#right_click#;>];#left_click#;<];/;, ]\`]
$addtimestamp
$onlyif[$gettextsplitlength>=2;{description:There are no custom commands on the server \`$servername\`}{color:ff2050}]
$textsplit[$getservervar[ccmd];/] 
$onlyIf[$getGlobalUserVar[prem;$authorID]==true;**⛔ You need \`premium\` to use this command**]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]`
}) 






bot.command({
name: "$alwaysExecute",
code: `
$advancedtextsplit[$getservervar[cdes];/;$findtextsplitindex[$tolowercase[$message]]]
$onlyif[$findtextsplitindex[$tolowercase[$message]]!=0;]
$onlyif[$isbot[$authorid]==false;]
$textsplit[$getservervar[ccmd];/] 
`
})

bot.reactionAddCommand({
channel:"$channelid",
code:`$if[$suppresserrors$getmessagevar[smid]$suppresserrors==]
$setmessagevar[smid;$splittext[1]]
$textsplit[$channelsendmessage[$getservervar[schannel];**⭐ $reactioncount[$channelid;$messageid;⭐]** | <#$channelid> | Originally Posted By <@$get[a]>{author:$usertag[$get[a]]}{description:$getmessage[$channelid;$messageid;content]}{field:Original Message:[Jump To Message!](https://discord.com/channels/$guildid/$channelid/$messageid):no}{image:$replacetext[$replacetext[$isvalidlink[$messageattachment];true;$messageattachment];false;]}{color:YELLOW}{footer:Starred At $day-$month-$year | StarBoard System Of $username[$clientid]};yes]; ]
$let[a;$getmessagevar[author;$messageid]]
$suppresserrors
$else
$editmessage[$getmessagevar[smid];**⭐ $reactioncount[$channelid;$messageid;⭐]** | <#$channelid> | Originally Posted By <@$get[a]>{author:$usertag[$get[a]]}{description:$getmessage[$channelid;$messageid;content]}{field:Original Message:[Jump To Message!](https://discord.com/channels/$guildid/$channelid/$messageid):no}{image:$replacetext[$replacetext[$isvalidlink[$messageattachment];true;$messageattachment];false;]}{color:YELLOW}{footer:$getembed[$getservervar[schannel];$getmessagevar[smid];footer]};$getservervar[schannel]]
$let[a;$getmessagevar[author]]
$endif
$onlyif[$suppresserrors$reactioncount[$channelid;$messageid;⭐]$suppresserrors>=$getservervar[sreq];]
$onlyif[$emojitostring==⭐;]
$onlyif[$serverchannelexists[$getservervar[schannel]]==true;]
$onlyif[$getservervar[sreq]!=0;]`})
bot.reactionRemoveCommand({
channel:"$channelid",
code:`$if[$suppresserrors$reactioncount[$channelid;$messageid;⭐]$suppresserrors!=0]
$editmessage[$getmessagevar[smid];**⭐ $reactioncount[$channelid;$messageid;⭐]** | <#$channelid> | Originally Posted By <@$get[a]>{author:$usertag[$get[a]]}{description:$getmessage[$channelid;$messageid;content]}{field:Original Message:[Jump To Message!](https://discord.com/channels/$guildid/$channelid/$messageid):no}{image:$replacetext[$replacetext[$isvalidlink[$messageattachment];true;$messageattachment];false;]}{color:YELLOW}{footer:$getembed[$getservervar[schannel];$getmessagevar[smid];footer]};$getservervar[schannel]]
$let[a;$getmessagevar[author]]
$suppresserrors
$onlyif[$suppresserrors$reactioncount[$channelid;$messageid;⭐]$suppresserrors>=$getservervar[sreq];]
$else
$deletemessage[$getservervar[schannel];$getmessagevar[smid]]
$suppresserrors
$endif
$onlyif[$suppresserrors$messageexists[$getservervar[schannel];$getmessagevar[smid]]$suppresserrors==true;]
$onlyif[$replacetext[$emojitostring;⭐;]==;]
$onlyif[$channelexists[$getservervar[schannel]]==true;]
$onlyif[$getservervar[sreq]!=0;]`})

bot.command({
name: "blacklist", 
code: `$setGlobalUserVar[Blacklist;true;$findUser[$message]]
$senddm[$findUser[$message];**$username[$findUser[$message]]#$discriminator[$findUser[$message]] you are blacklisted now**]
$userTag[$findUser[$message]] has been blacklisted!!
$onlyIf[$findUser[$message]==$authorid;nu]
$onlyForIDs[$botownerid;896846485805744168;**⛔ Only the owner can use this command**]`
})
 
bot.command({
name: "unblacklist", 
code: `$setGlobalUserVar[Blacklist;false;$findUser[$message]]
**$username[$findUser[$message]]#$discriminator[$findUser[$message]] ✅ You are no longer on the blacklist**

$onlyForIDs[$botownerid;896846485805744168;**⛔ You are not the owner**]`
})

bot.deletedCommand({
 channel: "$channelID",
 code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day $month $year - $hour:$minute]`
});

 
bot.command({
name: "snipe",
code: `$color[RANDOM]
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]
$onlyIf[$getGlobalUserVar[Blacklist;$authorID]==false;{author:Oh no} {color:RED} {thumbnail:https://media.discordapp.net/attachments/903038778229268541/903415958243246100/22841a994e9477aaf121a8844c07ebf0.png} {description:Oh no <@$authorID> you are blacklisted from using my commands make sure to dm my Owner $userTag[$botownerid] for more info}]
`
})


bot.command({
name: "setavatar",
code: `
**Changed my avatar to**
$image[$messsage]
$setBotAvatar[$message]
$onlyForIDS[$botownerid;896846485805744168;]`})

bot.command({
name: "setname",
code:` **Changed my name to** \`$message\`
$setBotName[$message]
$onlyForIDS[$botownerid;896846485805744168;]`})


bot.onReactionAdd()
 bot.onReactionRemove()
 bot.onLeave()
 bot.onJoined()
 bot.onGuildJoin()
 bot.onGuildLeave()
 bot.onBanAdd()
 bot.onTypingStart()
 bot.onRateLimit()
 bot.onInviteCreate()
 bot.onChannelDelete()
 bot.onChannelUpdate()
 bot.onChannelCreate()
 bot.onInviteDelete()
 bot.onVoiceStateUpdate()
 bot.onRoleUpdate()
 bot.onMemberUpdate()
 bot.onRoleDelete()
 bot.onRoleCreate()
 bot.onBanRemove()
 bot.onMessageUpdate()
 bot.onPresenceUpdate()
 bot.onUserUpdate()
 bot.onMessageDelete()
 bot.onGuildUpdate()
 bot.onEmojiCreate()
 bot.onEmojiUpdate()
 bot.onEmojiDelete()
 bot.onMessageDeleteBulk()
 bot.onWebhookUpdate()
 bot.onChannelPinsUpdate()
 bot.onFunctionError()
 bot.onVariableCreate()
 bot.onVariableUpdate()
 bot.onVariableDelete()
 bot.onApplicationCmdCreate()
 bot.onApplicationCmdUpdate()
 bot.onApplicationCmdDelete()

bot.command({
name: "circle",
code: `
$image[https://frenchnoodles.xyz/api/endpoints/circle/?image=$userAvatar[$mentioned[1;yes]]]`
})

bot.command({
name: "rt",
code: `
$replaceText[$message[1];$message[2];$message[3]
$onlyForIDS[$botownerid;896846485805744168;]
`
})



  
  








/* soundboard */

bot.command({
name: "trapcall",
code: `
**Only elites shall answer :eyes:** 
$playSong[https://youtu.be/Na6r5_XPOtk;1m;yes;yes;{color:RANDOM}{description:An error occurred! Please contact the Bot Developer if this keeps happening!}]
$onlyBotPerms[speak;connect;{description:❌ I require these permissions - **Speak** and **Connect**}{color:RANDOM}]
$onlyIf[$voiceID!=;join a vc first]`})

bot.command({
name: "amogus",
code: `
**Sussy baaka** 
$playSong[https://youtu.be/zhdNANsw0Jo;1m;yes;yes;{color:RANDOM}{description:An error occurred! Please contact the Bot Developer if this keeps happening!}]
$onlyBotPerms[speak;connect;{description:❌ I require these permissions - **Speak** and **Connect**}{color:RANDOM}]
$onlyIf[$voiceID!=;join a vc first]`})



bot.command({
name: "sus",
code: `
**Sus ngl** 
$playSong[https://youtu.be/neeBnp9JpCE;1m;yes;yes;{color:RANDOM}{description:An error occurred! Please contact the Bot Developer if this keeps happening!}]
$onlyBotPerms[speak;connect;{description:❌ I require these permissions - **Speak** and **Connect**}{color:RANDOM}]
$onlyIf[$voiceID!=;join a vc first]`})


bot.command({
name: "dripsus",
code: `
**drip sus** 
$playSong[https://youtu.be/grd-K33tOSM;1m;yes;yes;{color:RANDOM}{description:An error occurred! Please contact the Bot Developer if this keeps happening!}]
$onlyBotPerms[speak;connect;{description:❌ I require these permissions - **Speak** and **Connect**}{color:RANDOM}]
$onlyIf[$voiceID!=;join a vc first]`})




bot.command({
name: "bababoey",
code: `
**Bababoey** 
$playSong[https://youtu.be/ia3Tc9FTgk0;1m;yes;yes;{color:RANDOM}{description:An error occurred! Please contact the Bot Developer if this keeps happening!}]
$onlyBotPerms[speak;connect;{description:❌ I require these permissions - **Speak** and **Connect**}{color:RANDOM}]
$onlyIf[$voiceID!=;join a vc first]`})

bot.command({
  name: "addemoji",
  aliases: "steal",
  code:`Emoji $addEmoji[https://cdn.discordapp.com/emojis/$replaceText[$replaceText[$checkCondition[$checkContains[$message[1];<]$checkContains[$message[1];:]$checkContains[$message[1];>]==truetruetrue]$isNumber[$message[1]];truefalse;$replaceText[$advancedTextSplit[$message[1];:;3];>;]];falsetrue;$message[1]];$message[2];yes] added with the name -> **$message[2]**
 $onlyIf[$charCount[$message[2]]>=2;⛔ **You must put a longer name over than \`2 chars\`**]
 $onlyIf[$message[2]!=;**Usage**: \`addemoji <emoji | emojiID> <name>\`]
$onlyPerms[manageemojis;**You dont have the permission to use this command**]
$onlyBotPerms[manageemojis;**I dont have the permission to use this command**]
$suppressErrors`
})

bot.command({
name: "setsymbol",
aliases: ['set-symbol','symvol','set symbol'],
code: `
**Successfully set $message as new money symbol**
$setServerVar[esimbol;$message]
$setServerVar[simbol;$message]
$onlyIf[$getGlobalUserVar[prem;$authorID]==true;**You need** \`premium\` **for this command**]
$onlyPerms[manageserver;you need \`MANAGE_SERVER\` perms]
`
})

bot.joinCommand({
  channel: "$systemChannelID",
  code: `
  $setGlobalUserVar[cash;$random[5000000;100000000]]
  $setGlobalUserVar[evil;$random[1000000;10000000]]
$setGlobalUserVar[joker;$random[100;999]]
$setGlobalUserVar[bank;50000000000]
$setGlobalUserVar[ticket;$random[100;10000]]
$setGlobalUserVar[plant;$random[100000;9999999]]
$setGlobalUserVar[bag;$random[500;10000]]
$setGlobalUserVar[trophy;$random[5000;500000]]
$setGlobalUserVar[bc;150000000000]
$onlyIf[$isbot[$authorid]==true;]
  `})




bot.command({
name:"set-levelling",
aliases:"levelling",
usage:"set-levelling (reset/<optional channel> <optional message>)",
description:"Set your levelling. If no message is specified, the original message is sent.",
category:"Levelling",
code:`$if[$message==reset]
$setservervar[levelling;false]
I successfully reset levelling for this server!
$else
$setservervar[levelling;true]
$setservervar[level_channel;$findchannel[$message[1]]]
$setservervar[level_msg;$replacetext[$replacetext[$checkcondition[$message[2]==];true;$getservervar[level_msg]];false;$nomentionmessage]]
Levelling system successfully set up! If you did not use any place holders, and want to use them, check below ->
{user.name} -> $username
{user.mention} -> <@$authorid>
{level} -> 1
$onlyif[$mentionedchannels[1]!=;Could not find the channel!]
$endif
$onlyperms[manageserver;Not enough permissions! You need manage server permissions to execute this!]`})
 
 
bot.command({
name:"lrole",
aliases:"level-role",
category:"Levelling",
usage:"lrole add/remove <level> <role>",
description:"Add a level up role!",
code:`$if[$message[1]==add]
$setservervar[level_order;$getservervar[level_order]$message[2]/]
$setservervar[level_roles;$getservervar[level_roles]$findrole[$messageslice[2]]/]
I successfully added $rolename[$findrole[$messageslice[2]]] to the level \`$message[2]\`
$argscheck[>2;Enter atleast 3 arguments! $getservervar[prefix]lrole <add/remove> <level> <role>]
$elseif[$message[1]==remove]
$setservervar[level_order;$replacetext[$getservervar[level_order];$message[2]/;;1]]
$setservervar[level_roles;$replacetext[$getservervar[level_roles];$splittext[$findtextsplitindex]/;;1]]
I successfully removed the role of the level \`$message[2]\`
$onlyif[$findtextsplitindex[$message[2]]!=0;Could not find the role!]
$textsplit[$getservervar[level_order];/]
$endelseif
$else
Use either \`add\` or \`remove\`!
$endif
$onlyif[$isnumber[$message[2]]==true;Not a valid number!]
$onlyperms[manageserver;Not enough permissions!]`})
 
 
bot.command({
name:"lmsg",
aliases:"level-message",
category:"Levelling",
usage:"lmsg add/remove <role> <message>",
description:"Add a custom level up message for a specific level!",
code:`$if[$message[1]==add]
$setservervar[level_morder;$getservervar[level_morder]$message[2]/]
$setservervar[level_msges;$getservervar[level_msges]$messageslice[2]/]
I successfully added the message **$messageslice[2]** to the level \`$message[2]\`
$argscheck[>2;Enter atleast 3 arguments! $getservervar[prefix]lmsg <add/remove> <level> <message>]
$elseif[$message[1]==remove]
$setservervar[level_morder;$replacetext[$getservervar[level_morder];$message[2]/;;1]]
$setservervar[level_msges;$replacetext[$getservervar[level_msges];$advancedtextsplit[$getservervar[level_msges];/;$findtextsplitindex[$message[2]]]/;;1]]
I successfully removed the role of the level \`$message[2]\`
$textsplit[$getservervar[level_morder];/]
$onlyif[$findtextsplitindex[$message[2]]!=0;Could not find the level!]
$endelseif
$else
Use either \`add\` or \`remove\`!
$endif
$onlyperms[manageserver;Not enough permissions!]`})
 
 
bot.command({
name:"rank",
aliases:"level",
category:"Levelling",
description:"Check the rank of a user.",
usage:"rank <optional user>",
code:`$if[$message==]
$author[Rank of $usertag[$get[user]];$authoravatar]
$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$get[user]]; ;+;-1]&avatar=$userAvatar[$get[user]]?size=4096&level=$getUserVar[rank;$get[user]]&rank=&currentxp=$getUserVar[exp;$get[user]]&nextlevelxp=$getUserVar[req;$get[user]]&previouslevelxp=0&custombg=$getUserVar[level_card]&xpcolor=00FF00&isboosting=false]
$color[RANDOM]
$addtimestamp
$let[user;$authorid]
$else
$suppresserrors
$addtimestamp
$color[RANDOM]
$author[Rank of $usertag[$get[user]];$authoravatar]
$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$get[user]]; ;+;-1]&avatar=$userAvatar[$get[user]]?size=4096&level=$getUserVar[rank;$get[user]]&rank=&currentxp=$getUserVar[exp;$get[user]]&nextlevelxp=$getUserVar[req;$get[user]]&previouslevelxp=0&custombg=$getUserVar[level_card]&xpcolor=#00FF00&isboosting=false]
$let[user;$replacetext[$replacetext[$checkcondition[$findMember[$djseval[message.guild.members.fetch().then(a => a.find(x =>x.user.username.toLowerCase().includes('$message'.toLowerCase())).user.id);yes];no]==undefined];true;$findmember[$message;yes]];false;$findMember[$djseval[message.guild.members.fetch().then(a => a.find(x =>x.user.username.toLowerCase().includes('$message'.toLowerCase())).user.id);yes];no]]]
$endif
$onlyif[$getservervar[levelling]==true;The levelling system is disabled!]`})
 
 

 
 
bot.command({
name:"$alwaysExecute",
code:`$suppresserrors
$giverole[$authorid;$advancedtextsplit[$getservervar[level_roles];/;$findtextsplitindex[$getuservar[rank]]]]
$textsplit[$getservervar[level_order];/]
$setuservar[rank;$sum[$getuservar[rank];1]]
$setUserVar[req;$truncate[$sum[$getuservar[req];$math[$getuservar[req]*1/2]]]]
$setuservar[exp;0]
$channelsendmessage[$replacetext[$replacetext[$checkcondition[$getservervar[level_channel]==];true;$channelid];false;$getservervar[level_channel]];$usertag[$authorid]{author:$usertag levelled up!:$authoravatar}{thumbnail:$authoravatar}{timestamp}{description:$replacetext[$replacetext[$replacetext[$get[msg];{user.name};$username];{user.mention};<@$authorid>];{level};$sum[$getUserVar[rank];1]]}{color:BLUE}]
$let[msg;$getservervar[$replacetext[$replacetext[$checkcondition[$findtextsplitindex[$sum[$getuservar[rank]];]==0];true;level_msg];false;level_msges]]]
$textsplit[$getservervar[level_morder];/]
$onlyIf[$getUserVar[exp]>=$getUserVar[req];]
$onlyif[$getservervar[levelling]==true;]
$suppresserrors`})
 
 

bot.command({
name:"$alwaysExecute",
code:`$setUserVar[exp;$sum[$getUserVar[exp];$random[4;8]]]
$cooldown[7s]
$onlyif[$getservervar[levelling]==true;]`})























































































bot.readyCommand({
    channel: "895363731192709150",
    code: `$log[Filter reseted.]
$sendMessage[Filter Reseted. **$serverCount Servers**;no]
$forEachGuild[massfilter]
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID]\` (\`$packageVersion\` / \`$nodeVersion\`);no]`
})

bot.awaitedCommand({
name: "massfilter",
code: `$setUserVar[reactmessageid;;$clientID]
$resetServerVar[durationcache]
$resetServerVar[filters]
$suppressErrors`
})

bot.interactionCommand({
name: "filter",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
30 ) 3d, 8d, 8d-v2, chipmunk, chorus, clarity, distorted, deep, delay, double, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x

2  ) all, clear
\`\`\`]
$addField[Filters;$getServerVar[filters];no]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$toLowercase[$message[1]]==nightcore]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:0.775;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getVar[color]}]
$setServerVar[filters;Nightcore]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chipmunk]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.9;speed:0.550;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chipmunk} {color:$getVar[color]}]
$setServerVar[filters;Chipmunk]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==surround]
$songFilter[phaser:0;flanger:0;gate:0;surround:1;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[300ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getVar[color]}]
$setServerVar[filters;Surround]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==flanger]
$songFilter[phaser:0;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getVar[color]}]
$setServerVar[filters;Flanger]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==gate]
$songFilter[phaser:0;flanger:0;gate:1;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getVar[color]}]
$setServerVar[filters;Gate]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chorus]
$songFilter[phaser:1;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getVar[color]}]
$setServerVar[filters;Chorus]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==phaser]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getVar[color]}]
$setServerVar[filters;Phaser]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==earwax]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:1;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getVar[color]}]
$setServerVar[filters;Earwax]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==echo]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:100;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getVar[color]}]
$setServerVar[filters;Echo]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.5;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getVar[color]}]
$setServerVar[filters;Pulsator]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:2;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getVar[color]}]
$setServerVar[filters;Pulsator 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==distorted]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:99;pulsator:0;vibrato:0]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getVar[color]}]
$setServerVar[filters;Distorted]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getVar[color]}]
$setServerVar[filters;Vibrato]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getVar[color]}]
$setServerVar[filters;Vibrato 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==space]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getVar[color]}]
$setServerVar[filters;Space]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = All} {color:$getVar[color]}]
$setServerVar[filters;All]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==deep]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:-3;pitch:0.9;speed:1.1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getVar[color]}]
$setServerVar[filters;Deep]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==3d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.125;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getVar[color]}]
$setServerVar[filters;3D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:30;contrast:0;pulsator:0.08;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D} {color:$getVar[color]}]
$setServerVar[filters;8D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clarity]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Clarity} {color:$getVar[color]}]
$setServerVar[filters;Clarity]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==nightcore-normal]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore Normal} {color:$getVar[color]}]
$setServerVar[filters;Nightcore Normal]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==half]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0.5;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Half} {color:$getVar[color]}]
$setServerVar[filters;Half]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==double]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:2;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Double} {color:$getVar[color]}]
$setServerVar[filters;Double]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==fan]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:25;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Fan} {color:$getVar[color]}]
$setServerVar[filters;Fan]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==purebass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:20;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Purebass} {color:$getVar[color]}]
$setServerVar[filters;Purebass]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==low]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Low} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.05;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Low]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==mid]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Mid} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.2;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Mid]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==high]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = High} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.07;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;High]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==delay]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Delay} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1000;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Delay]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d-v2]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D V2} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;echo:0.1;contrast:0;pulsator:0.15;vibrato:0;earwax:1]
$setServerVar[filters;8D V2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseIf[$toLowercase[$replaceText[$message[1];-; ]]==$toLowercase[$getServerVar[filters]]]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vaporwave]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vaporwave} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0.875;speed:1;echo:0;contrast:0;pulsator:0;vibrato:0;earwax:0]
$setServerVar[filters;Vaporwave]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$else
There no filter \`$message\`.
$endif
$onlyIf[$songInfo[duration]!=0 Seconds;\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]
$suppressErrors`
})

bot.interactionCommand({
name: "play",
code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$getServerVar[filters]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[play;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "pause",
code: `$pauseSong
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[pause]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏸]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[durationcache;$splitText[1]]
$textSplit[$songInfo[current_duration]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[pause;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "resume",
code: `$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[resume]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[▶]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[resume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.interactionCommand({
name: "stop",
code: `$setServerVar[durationcache;0]
$setServerVar[filters;none]
$stopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[stop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors
$interactionReply[\`$userTag[$authorID]\` using slash.]`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==true-true]
$author[Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[Ping;\`$dbPingms\`;yes]
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)];yes]
$addField[URL;[Song]($songInfo[url] "$songInfo[title]");yes] 
$addField[Volume;\`$volume%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$elseIf[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==false-true]
$setUserVar[reactmessageid;$get[a];$clientID]
$reactionCollector[$get[a];$songInfo[userID];1d;🔄,⏯,⏹,⏭,🔁,🔀;clearqueueyes,resume-pause,stop,skip,loop,recentshuffle;yes]
$wait[$ping]
$let[a;$sendMessage[{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]};yes]]
$textSplit[$songInfo[duration]; ]
$onlyIf[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==false;{execute:recentskipplay}]
$endelseif
$endif
$onlyIf[$getGlobalUserVar[logmusic;$songInfo[userID]]!=1;]
$volume[$getGlobalUserVar[vol;$songInfo[userID]]]
$setGlobalUserVar[userused;$sum[$getGlobalUserVar[userused;$songInfo[userID]];1];$songInfo[userID]]`
});

bot.awaitedCommand({
name: "recentplay",
code: `$editMessage[$getUserVar[reactmessageid;$clientID];{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]}]
$textSplit[$songInfo[duration] $songInfo[current_duration]; ]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.awaitedCommand({
name: "recentskipplay",
code: `$editMessage[$getUserVar[reactmessageid;$clientID];{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]}]
$textSplit[$songInfo[duration]; ]`
})

bot.awaitedCommand({
name: "recentshuffle",
code: `$loop[1;recentplay]
$wait[2s]
$editMessage[$getUserVar[reactmessageid;$clientID];{author:Shuffle Queue:$getVar[customemoji1]} {field:Requested By:<@$authorID>:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {description:\`$cropText[$queue[1;$queueLength;{number} - {title}];4000]\`} {color:$getVar[color]} {footer:Redirecting..} {timestamp}]
$shuffleQueue
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$getGlobalUserVar[saveseek;$songInfo[userID]]!=0]
$setGlobalUserVar[saveseek;0;$songInfo[userID]]
$sendMessage[{description:Seek recently to $humanizeMS[$multi[$getGlobalUserVar[saveseek;$songInfo[userID]];1000];10]} {color:$getVar[color]} {timestamp};no]
$seekTo[$getGlobalUserVar[saveseek;$songInfo[userID]]]
$endif
$if[$getGlobalUserVar[vol;$songInfo[userID]]>=$sum[$getServerVar[maxvol];1]]]
$setGlobalUserVar[vol;50;$songInfo[userID]]
$volume[50]
$sendMessage[{title:Volume User was change to 50%.} {footer:Bypass limit Max Volume Server} {color:$getVar[color]} {delete:5s};no]
$endif
$if[$checkContains[$usersInChannel[$voiceID[$clientID];id; ];$songInfo[userID]]==false]
$leaveVC
$sendMessage[Looks like there no people on vc.;no]
$onlyIf[$getGlobalUserVar[247;$songInfo[userID]]!=2;]
$onlyIf[$getTextSplitLength<2;]
$textSplit[$usersInChannel[$voiceID[$clientID];id; ]; ]
$endif
$suppressErrors`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$if[$isDeafened[$clientID]==true]
$deafenUser[$clientID;yes]
$onlyIf[$isSelfDeafened[$clientID]==false;]
$onlyBotPerms[deafenmembers;]
$else
$endif
$if[$isSelfDeafened[$clientID]==false]
$title[Non-self-Deafened]
$description[<@$clientID> Failed to self-deafen.]
$color[$getVar[color]]
$addTimestamp
$deleteIn[2s]
$onlyIf[$isDeafened[$clientID]==true;]
$endif
$if[$checkContains[$songInfo[url];https://youtube.com/]==true]
$setServerVar[linkdownload;$replaceText[$uri[decode;$advancedTextSplit[$httpRequest[$songInfo[url]];"AUDIO_QUALITY_MEDIUM";2;"signatureCipher":";2;url=;2;";1]];%2C;,]]
$else
$if[$getVar[clientidsoundcloud]==]
$setServerVar[linkdownload;$advancedTextSplit[$httpRequest[$songInfo[url]];{"url":;3;";2]]
$else
$setServerVar[linkdownload;$jsonRequest[$advancedTextSplit[$httpRequest[$songInfo[url]];{"url":;3;";2]?client_id=$getVar[clientidsoundcloud];url]]
$endif
$endif
$if[$getUserVar[nontrigger;$clientID]==1]
$setUserVar[nontrigger;0;$clientID]
$endif
$suppressErrors`
})

bot.musicEndCommand({
  channel: "$channelID",
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$setServerVar[filters;none]
$title[There no song again on queue.]
$footer[Left VC.]
$color[$getVar[color]]`
});

bot.awaitedCommand({
name: "clearqueueyes",
code: `$setServerVar[durationcache;0]
$clearSongQueue
$pauseSong
$editIn[2ms;{description:$replaceText[$getVar[clearsong];{amount};$queueLength]} {color:$getVar[color]} {timestamp}] ⚠️ Clearing...
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$setServerVar[filters;none (temporary)]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;]`
});

bot.awaitedCommand({
name: "clearqueueno",
code: `$description[Clearing was cancelled.]
$color[$getVar[color]]
$addTimestamp
$deleteIn[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]`
});

bot.awaitedCommand({
name: "top",
code: `$deletecommand
$title[Top Playing Song - $numberSeparator[$charCount[$globalUserLeaderboard[userused;asc;\`) {top} {username} - {value}\`]]]]
$description[$globalUserLeaderboard[userused;asc;\`) {top} {username} - {value}\`]]
$color[$getVar[color]]
$addTimestamp`
})

bot.awaitedCommand({
name: "resume-pause",
code: `$loop[1;recentplay]
$if[$queueStatus==paused]
$if[$getServerVar[durationcache]==0]
$seekTo[0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$else
$setServerVar[durationcache;$splitText[1]]
$pauseSong
$textSplit[$songInfo[current_duration]; ]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;]`
})

bot.awaitedCommand({
name: "loop",
code: `$loop[1;recentplay]
$if[$loopStatus==none]
$let[a;$loopSong]
$elseIf[$loopStatus==song]
$let[b;$loopQueue]
$let[a;$loopSong]
$endelseif
$elseIf[$loopStatus==queue]
$let[b;$loopQueue]
$endelseif
$else
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;]
$suppressErrors`
})

bot.awaitedCommand({
name: "stop",
code: `$setServerVar[durationcache;0]
$setServerVar[filters;none]
$stopSong
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]`
})

bot.awaitedCommand({
name: "skip",
code: `$setUserVar[nontrigger;1;$clientID]
$skipSong
$editMessage[$getUserVar[reactmessageid;$clientID];{title:$replaceText[$getVar[skip];{song};$songInfo[title]]}
{thumbnail:$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]}
{field:Starting Playing:\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`:yes}
{field:Duration:\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`:yes}
{field:Position:\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{timestamp}
{color:$getVar[color]}]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})

bot.command({
  name: "play",
  aliases: ["youtube", "p", "yt"],
  code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$if[$checkContains[$message;https://cdn.discordapp.com/attachments/]==true]
$let[song;$playSong[$uri[decode;$splitText[7]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$textSplit[$message;/]
$elseIf[$checkContains[$message;https://soundcloud.com/]==true]
$let[song;$playSoundcloud[$message;$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endelseif
$else
$let[song;$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endif
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "playskip",
  aliases: ["ps"],
  code: `$if[$checkContains[$getGlobalUserVar[logmusic];0;1]==false]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$skipTo[$sub[$queueLength;1]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;Starting Playing: \`$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\`];false;]]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$queueLength>=1;Require **1 song** to run it.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "soundcloud",
  aliases: ["sc"],
  code: `$if[$checkContains[$message[1];https://soundcloud.com/]==true]
$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$message;$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$botTyping
$else
$if[$getGlobalUserVar[scsearch]==1]
$awaitMessages[$authorID;20s;1,2,3,4,5;awaitsc1,awaitsc2,awaitsc3,awaitsc4,awaitsc5;Timed out.]
$setUserVar[awaitsc5;$get[result5]]
$setUserVar[awaitsc4;$get[result4]]
$setUserVar[awaitsc3;$get[result3]]
$setUserVar[awaitsc2;$get[result2]]
$setUserVar[awaitsc1;$get[result1]]
$editMessage[$get[id2];{description:
1. $get[result1]
2. $get[result2]
3. $get[result3]
4. $get[result4]
5. $get[result5]} {color:$getVar[color]} {thumbnail:$getVar[scemoji]} {timestamp} {footer:Type 1-5 for play} {delete:21s}]
$onlyIf[$get[result5]!=https://soundcloud.com;Not found.]
$onlyIf[$get[result4]!=https://soundcloud.com;Not found.]
$onlyIf[$get[result3]!=https://soundcloud.com;Not found.]
$onlyIf[$get[result2]!=https://soundcloud.com;Not found.]
$onlyIf[$get[result1]!=https://soundcloud.com;Not found.]
$let[result5;https://soundcloud.com$advancedTextSplit[$get[link];<h2><a href=";7;";1]]
$let[result4;https://soundcloud.com$advancedTextSplit[$get[link];<h2><a href=";6;";1]]
$let[result3;https://soundcloud.com$advancedTextSplit[$get[link];<h2><a href=";5;";1]]
$let[result2;https://soundcloud.com$advancedTextSplit[$get[link];<h2><a href=";4;";1]]
$let[result1;https://soundcloud.com$advancedTextSplit[$get[link];<h2><a href=";3;";1]]
$let[link;$httpRequest[https://www.soundcloud.com/search?q=$message]]
$let[id2;$sendMessage[{title:Searching} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$botTyping
$else
$botTyping
$let[song;$playSoundcloud[$get[resultfinal];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$let[resultfinal;https://soundcloud.com$advancedTextSplit[$get[link2];<h2><a href=";3;";1]]
$let[link2;$httpRequest[https://www.soundcloud.com/search?q=$message]]
$joinVC[$voiceID]
$endif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link song.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.awaitedCommand({
 name: "awaitsc1",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$getUserVar[awaitsc1];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})
bot.awaitedCommand({
 name: "awaitsc2",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$getUserVar[awaitsc2];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})
bot.awaitedCommand({
 name: "awaitsc3",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$getUserVar[awaitsc3];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})
bot.awaitedCommand({
 name: "awaitsc4",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$getUserVar[awaitsc4];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.awaitedCommand({
 name: "awaitsc5",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSoundcloud[$getUserVar[awaitsc5];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
  name: "download",
  code: `$if[$checkContains[$songInfo[url];https://soundcloud.com/]==true]
$attachment[$getServerVar[linkdownload];$cropText[$songInfo[title];28]_128_Bitrate.mp3]
$onlyIf[$checkContains[$getServerVar[linkdownload];playlist.m3u8]!=true;not available]
$else
$title[$songInfo[title];$getServerVar[linkdownload]]
$endif
$color[$getVar[color]]
$image[attachment://$random[1000;1000000]-thumbnail.png]
$attachment[$songInfo[thumbnail];$random[1000;1000000]-thumbnail.png]
$sendMessage[Downloading..;no]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyBotPerms[attachfiles;Missing Permission **Attach Files** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[3s;Please wait **%time%** before using again.]`
})

bot.command({
  name: "user",
  code: `$setServerVar[userid;$mentioned[1]]
$description[\`$userTag[$mentioned[1]]\` now only can execute command now.]
$addTimestamp
$color[$getVar[color]]
$addCmdReactions[✅]
$onlyIf[$isBot[$mentioned[1]]!=true;That not user]
$onlyIf[$mentioned[1]!=;Mention someone]
$argsCheck[1;Mention someone]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
});

bot.command({
  name: "user-disable",
  code: `$setServerVar[userid;default]
$description[Changed to default.]
$color[$getVar[color]]
$addCmdReactions[✅]
$addTimestamp
$onlyIf[$getServerVar[userid]!=default;Already default!]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
});



bot.command({
 name: "musicsettings",
 aliases: ["musicsetting", "musicset"],
 code: `$if[$message[1]==]
$addField[SC-Search;> \`$replaceText[$replaceText[$getGlobalUserVar[scsearch];0;off];1;on]\`
> (musicsettings sc-search);yes]
$addField[Max Volume;> \`$getServerVar[maxvol]%\`
> (musicsettings maxvol <value>);yes]
$addField[Stay VC;> \`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;off];1;on];2;on - 24/7]\`
> (musicsettings stay);yes]
$addField[React Only;> \`$replaceText[$replaceText[$getGlobalUserVar[controlreact];0;off];1;on]\`
> (musicsettings react);yes]
$addField[Log Music;> \`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[logmusic];1;off];2;on - reaction];0;on]\`
> (musicsettings log);yes]
$color[$getVar[color]]
$footer[Inspiration by DisTube]
$addTimestamp
$thumbnail[$userAvatar[$clientID;1024]]
$elseIf[$message[1]==log]
$if[$getGlobalUserVar[logmusic]==1]
$setGlobalUserVar[logmusic;0]
$title[Log music: **enable**]
$color[$getVar[color]]
$addTimestamp
$elseIf[$getGlobalUserVar[logmusic]==0]
$setGlobalUserVar[logmusic;2]
$title[Log music: **enable** (with reaction control)]
$color[$getVar[color]]
$addTimestamp
$endelseif
$elseIf[$getGlobalUserVar[logmusic]==2]
$setGlobalUserVar[logmusic;1]
$title[Log music: **disable**]
$color[$getVar[color]]
$addTimestamp
$endelseif
$endif
$endelseif
$elseIf[$message[1]==react]
$if[$getGlobalUserVar[controlreact]==0]
$description[Command for \`pause, resume, stop, loop, join, disconnect, shuffle, shuffleskip\` will be only return reaction.]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[controlreact;1]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$elseIf[$getGlobalUserVar[controlreact]==1]
$description[Disabled.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[controlreact;0]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$endelseif
$endif
$endelseif
$elseIf[$message[1]==stay]
$if[$getGlobalUserVar[247]==2]
$title[Off. Now no longer to be stay on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;0]
$elseif[$getGlobalUserVar[247]==0]
$title[On. Will be stay **2 minutes** on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;1]
$endelseif
$elseif[$getGlobalUserVar[247]==1]
$title[On. Will be stay **24/7** on voice channel.]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[247;2]
$endelseif
$endif
$endelseif
$elseIf[$message[1]==maxvol]
$if[$message[2]==]
$author[$serverName]
$footer[Current Max Volume: $getServerVar[maxvol]%;$serverIcon[$guildID;128]]
$color[$getVar[color]]
$elseIf[$message[2]!=]
$setServerVar[maxvol;$message[2]]
$title[Changed to \`$message[2]%\`]
$addTimestamp
$color[$getVar[color]]
$onlyIf[$message[2]<=501;Max volume just **500%**]
$onlyIf[$checkContains[$message[3];-]!=true;You cant set to negative.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]
$onlyIf[$message[2]!=;]
$endelseif
$endif
$endelseif
$elseIf[$message[1]==sc-search]
$if[$getGlobalUserVar[scsearch]==0]
$description[SC-Search: **on**]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[scsearch;1]
$else
$description[SC-Search: **off**]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[scsearch;0]
$endif
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]`
})

bot.command({
name: "filter",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
3  ) bass, pitch, speed

30 ) 3d, 8d, 8d-v2, chipmunk, chorus, clarity, distorted, deep, delay, double, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x

2  ) all, clear
\`\`\`]
$addField[Filters;$getServerVar[filters];no]
$footer[Usage: filter <filter> (value optional)]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$toLowercase[$message[1]]==nightcore]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:0.775;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getVar[color]}]
$setServerVar[filters;Nightcore]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chipmunk]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.9;speed:0.550;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chipmunk} {color:$getVar[color]}]
$setServerVar[filters;Chipmunk]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==bass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5];pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Bass | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5] dB} {color:$getVar[color]}]
$setServerVar[filters;Bass | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]<=20;Max. **20**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]>=-20;Min. **-20**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==surround]
$songFilter[phaser:0;flanger:0;gate:0;surround:1;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[300ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getVar[color]}]
$setServerVar[filters;Surround]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==flanger]
$songFilter[phaser:0;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getVar[color]}]
$setServerVar[filters;Flanger]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==gate]
$songFilter[phaser:0;flanger:0;gate:1;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getVar[color]}]
$setServerVar[filters;Gate]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chorus]
$songFilter[phaser:1;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getVar[color]}]
$setServerVar[filters;Chorus]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==phaser]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getVar[color]}]
$setServerVar[filters;Phaser]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==earwax]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:1;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getVar[color]}]
$setServerVar[filters;Earwax]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pitch]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1];speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pitch | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getVar[color]}]
$setServerVar[filters;Pitch | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=1.9;Max. **1.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.09;Min. **0.1**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==speed]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1];earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Speed | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getVar[color]}]
$setServerVar[filters;Speed | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=9.9;Max. **9.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.4;Min. **0.5**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==echo]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:100;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getVar[color]}]
$setServerVar[filters;Echo]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.5;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getVar[color]}]
$setServerVar[filters;Pulsator]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:2;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getVar[color]}]
$setServerVar[filters;Pulsator 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==distorted]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:99;pulsator:0;vibrato:0]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getVar[color]}]
$setServerVar[filters;Distorted]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getVar[color]}]
$setServerVar[filters;Vibrato]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getVar[color]}]
$setServerVar[filters;Vibrato 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==space]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getVar[color]}]
$setServerVar[filters;Space]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = All} {color:$getVar[color]}]
$setServerVar[filters;All]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==deep]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:-3;pitch:0.9;speed:1.1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getVar[color]}]
$setServerVar[filters;Deep]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==3d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.135;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getVar[color]}]
$setServerVar[filters;3D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:30;contrast:0;pulsator:0.08;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D} {color:$getVar[color]}]
$setServerVar[filters;8D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clarity]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Clarity} {color:$getVar[color]}]
$setServerVar[filters;Clarity]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==nightcore-normal]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore Normal} {color:$getVar[color]}]
$setServerVar[filters;Nightcore Normal]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==half]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0.5;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Half} {color:$getVar[color]}]
$setServerVar[filters;Half]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==double]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:2;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Double} {color:$getVar[color]}]
$setServerVar[filters;Double]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==fan]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:25;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Fan} {color:$getVar[color]}]
$setServerVar[filters;Fan]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==purebass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:20;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Purebass} {color:$getVar[color]}]
$setServerVar[filters;Purebass]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==low]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Low} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.05;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Low]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==mid]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Mid} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.2;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Mid]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==high]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = High} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.07;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;High]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==delay]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Delay} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1000;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Delay]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d-v2]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D V2} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;echo:0.1;contrast:0;pulsator:0.15;vibrato:0;earwax:1]
$setServerVar[filters;8D V2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vaporwave]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vaporwave} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0.875;speed:1;echo:0;contrast:0;pulsator:0;vibrato:0;earwax:0]
$setServerVar[filters;Vaporwave]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$else
There no filter \`$message\`.
$endif
$onlyIf[$songInfo[duration]!=0 Seconds;\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]`
});

bot.command({
  name: "check",
  code: `$title[Check]
$description[\`\`\`
Public       : $replaceText[$replaceText[$client[ispublic];true;✅];false;❌]

Pause        : $replaceText[$replaceText[$checkCondition[$getVar[pause]!=];true;✅];false;❌]
Resume       : $replaceText[$replaceText[$checkCondition[$getVar[resume]!=];true;✅];false;❌]
Skip         : $replaceText[$replaceText[$checkCondition[$getVar[skip]!=];true;✅];false;❌]
Stop         : $replaceText[$replaceText[$checkCondition[$getVar[stop]!=];true;✅];false;❌]
Shuffle      : $replaceText[$replaceText[$checkCondition[$getVar[shuffle]!=];true;✅];false;❌]
Clearqueue   : $replaceText[$replaceText[$checkCondition[$getVar[clearsong]!=];true;✅];false;❌]
Join         : $replaceText[$replaceText[$checkCondition[$getVar[join]!=];true;✅];false;❌]
Disconnect   : $replaceText[$replaceText[$checkCondition[$getVar[dc]!=];true;✅];false;❌]
Play         : $replaceText[$replaceText[$checkCondition[$getVar[errorjoin]!=];true;✅];false;❌]
ClientID     : $replaceText[$replaceText[$checkCondition[$getVar[clientidsoundcloud]!=];true;✅];false;❌]
UserID       : $replaceText[$replaceText[$checkCondition[$getServerVar[userid]!=default];true;✅];false;❌]
Log Music    : $replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;✅];false;❌]
React        : $replaceText[$replaceText[$checkContains[$getGlobalUserVar[controlreact];1];true;✅];false;❌]

Max Volume   : $getServerVar[maxvol]%
User Volume  : $getGlobalUserVar[vol]%

1) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[customemoji1]!=];true;✅];false;❌]
2) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[ytemoji]!=];true;✅];false;❌]
3) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[scemoji]!=];true;✅];false;❌]
4) Emoji     : $replaceText[$replaceText[$checkCondition[$getVar[loademoji]!=];true;✅];false;❌]

Connect      : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;connect]==true];true;✅];false;❌]
Speak        : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;speak]==true];true;✅];false;❌]
Deafen       : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;deafenmembers]==true];true;✅];false;❌]
Reactions    : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;addreactions]==true];true;✅];false;❌]
Messages     : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;managemessages]==true];true;✅];false;❌]
Embed Links  : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;embedlinks]==true];true;✅];false;❌]
Attach Files : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;attachfiles]==true];true;✅];false;❌]
Move Members : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;movemembers]==true];true;✅];false;❌]
\`\`\`]
$color[$getVar[color]]
$footer[Color: $getVar[color]
Latency: $numberSeparator[$botPing]ms]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]`
});

bot.command({
  name: "user-info",
  code: `$author[$username[$findUser[$message;yes]]#$discriminator[$findUser[$message;yes]];$userAvatar[$findUser[$message;yes]]]
$addField[Command Used;\`$numberSeparator[$getGlobalUserVar[commanduserused;$findUser[$message;yes]];.]\`;yes]
$addField[Song Played;\`$numberSeparator[$getGlobalUserVar[userused;$findUser[$message;yes]];.]\`;yes]
$addField[Created At; \`$creationDate[$findUser[$message;yes];date]\`;yes]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$isBot[$findUser[$message;yes]]!=true;{description:\`❌ Oops.. looks like we cant collect data user.\`} {color:$getVar[color]}]`
});

bot.command({
  name: "seek",
  code: `$if[$toLowercase[$message[2]]==save]
$addField[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$message[1];1000];10]!=];false;0 second];true;$humanizeMS[$multi[$message[1];1000];10]] ($djsEval[new Date($replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0];true;$noMentionMessage] * 1000).toISOString().substr(11, 8);yes])\`;one-time use saving seek.]
$footer[Value: $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[saveseek;$message[1]]
$seekTo[$message[1]]
$onlyIf[$message[1]!=0;You cant.]
$else
$description[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0 second];true;$humanizeMS[$multi[$noMentionMessage;1000];10]] ($djsEval[new Date($replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0];true;$noMentionMessage;1000] * 1000).toISOString().substr(11, 8);yes])\`]
$footer[Value: $noMentionMessage]
$color[$getVar[color]]
$wait[$sum[$multi[$botPing;1;2;3];$dbPing]]
$seekTo[$noMentionMessage]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[1];-]!=true;You cant seek negative.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[>1;Usage: \`seek (number)\`]
$onlyIf[$songInfo[duration]!=0 Seconds;\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "join",
  aliases: ["j", "summon"],
  code: `$joinVC[$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]
$if[$hasPerms[$clientID;movemembers]==true]
$moveUser[$authorID;$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]
$endif
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[✅]
$onlyBotPerms[addreactions;]
$else
$replaceText[$getVar[join];{join};$channelName[$replaceText[$replaceText[$checkCondition[$message!=];false;$voiceID];true;$findChannel[$message]]]]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$voiceID[$clientID]==;Already joined!]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "rejoin",
  aliases: ["reconnect"],
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$if[$voiceID[$clientID]==]
$joinVC[$voiceID]
$else
$joinVC[$voiceID]
$wait[$multi[$botPing;2]]
$leaveVC
$setServerVar[filters;none]
$endif
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
})

bot.command({
  name: "disconnect",
  aliases: ["dc", "bye", "leave"],
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$if[$hasPerms[$clientID;movemembers]==true]
$moveUser[$authorID]
$endif
$leaveVC
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[✔]
$onlyBotPerms[addreactions;]
$else
$getVar[dc]
$endif
$onlyIf[$voiceID[$clientID]!=;Already disconnected!]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "slash",
  code: `$createSlashCommand[$guildID;play;Play song;song:Support YouTube & Soundcloud:true:3]
$createSlashCommand[$guildID;filter;For list, just leave blank;filter:Use FIlter:false:3]
$createSlashCommand[$guildID;resume;Resume Song]
$createSlashCommand[$guildID;pause;Pause Song]
$createSlashCommand[$guildID;stop;Stop Song]
$title[Successfully created]
$description[You can use slash command now.] $color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyPerms[manageserver;You didnt have permission **Manage Server**.]
$suppressErrors[failed.]`
});

bot.command({
  name: "pause",
  code: `$pauseSong
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[pause]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏸]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[durationcache;$splitText[1]]
$textSplit[$songInfo[current_duration]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "resume",
  code: `$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[resume]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[▶]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "loop",
  aliases: ["l", "loopsong", "loopmusic"],
  code: `$if[$getGlobalUserVar[controlreact]==1]
$let[say goodbye;$loopSong]
$addCmdReactions[🔂]
$onlyBotPerms[addreactions;]
$else
$description[$replaceText[$replaceText[$checkCondition[$loopSong==true];true;Loop now **on**];false;Loop now **off**]]
$color[$getVar[color]]
$addTimestamp
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=queue;You currently active **queue loop.**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "qloop",
  aliases: ["ql", "loopqueue"],
  code: `$if[$getGlobalUserVar[controlreact]==1]
$let[let you down;$loopQueue]
$addCmdReactions[🔁]
$onlyBotPerms[addreactions;]
$else
$description[$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Queue Loop now **on**];false;Queue Loop now **off**]]
$color[$getVar[color]]
$addTimestamp
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=song;You currently active **song loop.**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "reboot",
  code: `$if[$message[1]==]
$description[) reboot --normal
> Reboot

) reboot --destroy
> Reboot Instantly Turn Off]
$color[$getVar[color]]
$addTimestamp
$elseIf[$toLowercase[$message[1]]==--normal]
$reboot[server.js]
$wait[40ms]
$addCmdReactions[✅]
$endelseif
$elseIf[$toLowercase[$message[1]]==--destroy]
$killClient
$wait[40ms]
$addCmdReactions[✅]
$endelseif
$endif
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
});

bot.command({
  name: "eval",
  code: `$eval[$message]
  $deleteCommand
  $deleteIn[1m]
$onlyForids[896846485805744168;$botownerid;no]`
});

bot.command({
  name: "funcs",
  code: `$author[$getObjectProperty[data[0].desc]$getObjectProperty[message]]
Usage: \`$getObjectProperty[data[0].usage]\`
$createObject[$jsonRequest[https://api.leref.ga/functions/$message;;Functions \`$message\` not found.]]
$color[$getVar[color]]
$addTimestamp
$argsCheck[>1;Functions?]
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
});

bot.command({
  name: "pruning",
  code: `$description[$replaceText[$replaceText[$checkCondition[$pruneMusic==true];true;Pruning: **on**];false;Pruning: **off**]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[logmusic]!=2;You currently active reaction control.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "shuffle",
  aliases: ["sf"],
  code: `$if[$getGlobalUserVar[controlreact]==1]
$shuffleQueue
$addCmdReactions[🔀]
$onlyBotPerms[addreactions;]
$else
$editIn[2ms;{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;3;\`{number} - {title}\`]} {timestamp};{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;7;\`{number} - {title}\`]} {timestamp};{author:$getVar[shuffle]} {title:Queue} {color:$getVar[color]} {description:$queue[1;10;\`{number} - {title}\`]} {timestamp}]
$shuffleQueue
$title[Updating..]
$addTimestamp
$color[$getVar[color]]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "shuffleskip",
  aliases: ["sfs"],
  code: `$skipSong
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[🔀;⏭]
$onlyBotPerms[addreactions;]
$else
$author[$getVar[shuffle]]
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$endif
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "remove",
  aliases: ["r"],
  code: `$moveSong[$sum[$message[1];1];]
$title[$replaceText[$getVar[remove];{d-amount};$replaceText[$message[1];-;]]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$message[1]<=$sub[$queueLength;1];Only have **$queueLength song**.]
$onlyIf[$message[1]>1;You cant remove at first song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`remove (numnber song on queue)\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "nowplaying",
  aliases: ["np"],
  code: `$author[Now Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;yes]
$addField[Link;[Invite Bot]($replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]])
[Thumbnail]($songInfo[thumbnail])
$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;];false;[Download]($getServerVar[linkdownload])];yes]
$addField[Ping;\`$dbPingms\`;yes]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[URL;[Song]($songInfo[url] "$songInfo[title]");yes] 
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)];yes]
$addField[Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;LIVE];false;$djsEval[new Date($advancedTextSplit[$songInfo[duration_left]; ;1] * 1000).toISOString().substr(11, 8);yes]]\`;yes]
$addField[Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;LIVE];false;$djsEval[new Date($advancedTextSplit[$songInfo[current_duration]; ;1] * 1000).toISOString().substr(11, 8);yes]]\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($advancedTextSplit[$songInfo[duration]; ;1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "stop",
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$setServerVar[durationcache;0]
$stopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[stop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "skip",
  aliases: ["s"],
  code: `$if[$message[1]==]
$skipSong
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseIf[$isNumber[$message[1]]==true]
$skipTo[$replaceText[$replaceText[$checkContains[$loopStatus;song];true;$sum[$message[1];1]];false;$message[1]]]
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$message[1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$message[1]\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$message[1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$message[1]]; ]
$onlyIf[$checkContains[$message[1];-]!=true;You cant skip negative.]
$onlyIf[$message[1]!=0;You cant skip zero.]
$onlyIf[$message[1]<$queueLength;You only can skip **$sub[$queueLength;1] song**.]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$endelseif
$endif
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "clearqueue",
  aliases: ["cq"],
  code: `$awaitReaction[$authorID;15s;{title:Are you sure you wanna clear?} {footer:Song#COLON# $queueLength} {color:$getVar[color]};✅,❌;clearqueueyes,clearqueueno;Confirmation failed.;yes]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]`
});

bot.command({
  name: "top",
  code: `$awaitMessages[$authorID;50s;$random[13000;50000];top;Confirmation failed.]
$description[Verification first]
$footer[Code: $random[13000;50000]]
$color[$getVar[color]]
$onlyIf[$globalUserLeaderboard[userused;asc]!=;Seems like, this leaderboard was empty..]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyBotPerms[managemessages;Missing Permission, **Manage Messages** - Bot]`
})

bot.command({
  name: "queue",
  aliases: ["q"],
  code: `$author[Queue;$getVar[customemoji1]]
$addField[Page $replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage] - $truncate[$sum[$divide[$queueLength;10];0.9]] ($abbreviate[$charCount[$queue[1;$queueLength;{number} - {title}]]]);$queue[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];10;\`{number} - {title}\`]]
$addField[Estimated Next Playing;\`$djsEval[new Date($advancedTextSplit[$songInfo[duration_left]; ;1] * 1000).toISOString().substr(11, 8);yes]\`;yes]
$addField[Next Requested By;<@$songInfo[userID;1]>;yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$addField[Total Duration;\`$djsEval[new Date($sum[$advancedTextSplit[$songInfo[duration]; ;1];$advancedTextSplit[$songInfo[duration;1]; ;1]] * 1000).toISOString().substr(11, 8);yes]\`;yes]
$addField[Next Playing;[$songInfo[title;1] | $songInfo[publisher;1]]($songInfo[url;1]);yes]
$addField[Now Playing;[$songInfo[title] | $songInfo[publisher]]($songInfo[url]);yes]
$footer[$queueLength Song]
$thumbnail[$songInfo[thumbnail]]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];-]!=true;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]<=$truncate[$sum[$divide[$queueLength;10];0.9]];]
$onlyIf[$isNumber[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]]!=false;]
$onlyIf[$queueLength!=1;{author:Currently Playing:$getVar[customemoji1]} {title:$songInfo[title]} {url:$songInfo[url]} {footer:$songInfo[publisher]:$songInfo[thumbnail]} {field:Duration:\`$replaceText[$djsEval[new Date($advancedTextSplit[$songInfo[duration]; ;1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`:yes} {field:Duration Left:\`$replaceText[$replaceText[$checkCondition[$advancedTextSplit[$songInfo[duration]; ;1]==0];true;LIVE];false;$djsEval[new Date($advancedTextSplit[$songInfo[duration_left]; ;1] * 1000).toISOString().substr(11, 8);yes]]\`:yes} {thumbnail:$songInfo[thumbnail]} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist",
code: `$author[Playlist $username's;$getVar[customemoji1]]
$description[1) $getGlobalUserVar[1]
2) $getGlobalUserVar[2]
3) $getGlobalUserVar[3]
4) $getGlobalUserVar[4]
5) $getGlobalUserVar[5]
6) $getGlobalUserVar[6]
7) $getGlobalUserVar[7]
8) $getGlobalUserVar[8]
9) $getGlobalUserVar[9]
10) $getGlobalUserVar[10]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$queueLength==1];true;Playing];false;$replaceText[$replaceText[$checkCondition[$voiceID!=];true;Idle];false;none]]]
$addTimestamp
$color[$getVar[color]]
$thumbnail[$userAvatar[$authorID;512]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]`
});

bot.command({
name: "playlist-add",
code: `$setGlobalUserVar[$message[1];$messageSlice[1]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==];true;Add];false;Replace]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$message[1];-;]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-remove",
code: `$setGlobalUserVar[$message[1];]
$title[Your song has remove on $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[$message[1]]!=null;Already remove!]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-remove (number playlist)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-play",
code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$djsEval[new Date($splitText[1] * 1000).toISOString().substr(11, 8);yes];00:00:00;LIVE]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$let[song;$playSong[$getGlobalUserVar[$message[1]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no]]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$getGlobalUserVar[$message[1]]!=;Nothing song was added on playlist.]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-play (number playlist)\`]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "volume",
  aliases: ["v", "vol"],
  code: `$if[$isNumber[$message[1]]==true]
$sendMessage[{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp};no]
$volume[$filterMessage[$message[1];-]]
$setGlobalUserVar[vol;$filterMessage[$message[1];-]]
$onlyIf[$getServerVar[maxvol]>=$filterMessage[$message[1];-];You cant go above $getServerVar[maxvol]%]
$onlyIf[$filterMessage[$message[1];-]>=10;You cant go below 10%]
$else
$editMessage[$get[id];{title:Reaction Expired} {field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp} {delete:5s}]
$wait[1m]
$createVar[awaitvolume-$authorID:$get[id]]
$reactionCollector[$get[id];$authorID;1m;🔉,🔊,🔇;voldown,volup,volmute;yes]
$let[id;$sendMessage[{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp};yes]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.awaitedCommand({
 name: "voldown",
 code: `$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$sub[$volume;10]]
$setGlobalUserVar[vol;$sub[$volume;10];$authorID]
$onlyIf[$sub[$volume;10]>=10;Already minimum {delete:3s}]
$onlyIf[$volume!=0;React '🔇' to active]
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
})

bot.awaitedCommand({
 name: "volup",
 code: `$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$sum[$volume;10]]
$setGlobalUserVar[vol;$sum[$volume;10];$authorID]
$onlyIf[$sum[$volume;10]<=$getServerVar[maxvol];Already maximum {delete:3s}]
$onlyIf[$volume!=0;React '🔇' to active]
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
})

bot.awaitedCommand({
 name: "volmute",
 code: `$if[$volume==0]
$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$getGlobalUserVar[vol]]
$else
$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[0]
$endif
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
})
