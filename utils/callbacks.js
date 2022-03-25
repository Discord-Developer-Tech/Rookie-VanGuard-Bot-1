module.exports = (bot) => {
bot.onInteractionCreate();
bot.onJoined()


bot.botJoinCommand({
channel:"$randomchannelid",
code:`$eval[$getvar[about]]
$channelsendmessage[$getvar[join_channel];{author:New Server Joined}{description:I joined **$servername**($guildid)!}{field:Members Count Of The Server:$memberscount}{field:Owner:$usertag[$ownerid]($ownerid):no}{field:Total Members Count Now:$allmemberscount}{field:Current Server Count:$servercount}{timestamp}{thumbnail:$servericon}{color:GREEN};no]`})
bot.onGuildJoin()
bot.botLeaveCommand({
channel:"$getvar[join_channel]",
code:`$channelsendmessage[$getvar[join_channel];{author:Server Left}{description:I was removed from **$servername**($guildid)!}{field:Members Count Of The Server:$memberscount}{field:Owner:$usertag[$ownerid]($ownerid):no}{field:Total Members Count Now:$allmemberscount}{field:Current Server Count:$servercount}{timestamp}{thumbnail:$servericon}{color:FF0000};no]`})
bot.onGuildLeave()

//Tickets

bot.reactionAddCommand({
channel:"$channelid",
code:`$channelsendmessage[$splittext[1];<@$authorid>{author:$usertag's ticket!:$authoravatar}{title:Welcome to your ticket!}{description:$replacetext[$advancedtextsplit[$getservervar[tmsg];/;$get[i]];{user};$usertag]}{footer:Opened by $usertag | Ticketing system of $username[$clientid]:$useravatar[$clientid]}{timestamp}{thumbnail:$authoravatar}{color:RANDOM}{reactions:🔒};no]
$setchannelvar[topener;$authorid;$splittext[1]]
$setchannelvar[tsolve;false;$splittext[1]]
$modifychannelperms[$splittext[1];+sendmessages;$authorid]
$modifychannelperms[$splittext[1];+readmessages;$authorid]
$modifychannelperms[$splittext[1];+viewchannel;$authorid]
$textsplit[$createChannel[ticket-$username-#$discriminator;text;yes;$advancedtextsplit[$getservervar[tcat];/;$get[i]]]; ]
$djsEval[channel.messages.fetch(message.id).then(d=>d.reactions.resolve("🎫").users.remove(author.id))]
$onlyif[$get[i]!=0;]
$let[i;$findtextsplitindex[$messageid]]
$textsplit[$getservervar[tmid];/]
$onlyif[\`$emojitostring\`==\`🎫\`;]
$onlyif[$getservervar[tmsg]!=;]
$onlyif[$isbot[$authorid]==false;]`})
bot.onReactionAdd()
bot.reactionAddCommand({
channel:"$channelid",
code:`$deletechannels[$channelid]
$wait[10s]
$sendmessage[Closing ticket in 10 seconds;no]
$onlyif[$authorid==$getchannelvar[topener];Only **$usertag[$getchannelvar[topener]]** can do this. If you are an admin, you can use **$getservervar[prefix]settings** instead.]
$onlyif[$replacetext[$emojitostring;🔒;]==;]
$onlyif[$getchannelvar[topener]!=;]
$onlyif[$isbot[$authorid]==false;]`})
//Reaction Roles

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

//Snipe and Esnipe

bot.updateCommand({
channel:"$randomchannelid", 
code:`$setchannelvar[esnipem;[Message](https://discord.com/channels/$guildid/$channelid/$messageid)\n\n**Old Message:** $oldmessage\n\n**New Message:** $message]
$setchannelvar[esnipea;$authorid;$channelused]
$onlyif[$partial==false;{execute:cache}]
$onlyif[$oldmessage!=$message;]`})
bot.onMessageUpdate()
bot.awaitedCommand({
name:"cache",
code:`$cachemembers`})
bot.deletedCommand({
channel:"$randomchannelid", 
code:`$setchannelvar[snipem;**Message:** $message;$channelused]
$setchannelvar[snipea;$authorid;$channelused]
$onlyif[$partial==false;{execute:cache}]`})
bot.onMessageDelete()

//Starboard

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
bot.readyCommand({
    channel: "$getVar[channelstatus]",
    code: `$log[Filter reseted.]
$editIn[2ms;Reseted.;Reseted. **$serverCount Servers**]
$forEachGuild[massfilter]
Reseting Filter..
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID]\` (\`$packageVersion\`);no]`
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$elseIf[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==false-true]
$setUserVar[reactmessageid;$get[a];$clientID]
$reactionCollector[$get[a];$songInfo[userID];1h;🔄,⏯,⏹,⏭,🔁,🔀;clearqueueyes,resume-pause,stop,skip,loop,recentshuffle;yes]
$wait[$ping]
$let[a;$sendMessage[{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
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
$setServerVar[linkdownload;https://api.vevioz.com/?v=$replaceText[$songInfo[url];https://youtube.com/watch?v=;]&type=mp3&bitrate=320]
$else
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$wait[1s]
$onlyIf[$getVar[clientidsoundcloud]!=;]
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
bot.botJoinCommand({
channel: "$systemchannelID",
code: `
$author[Disclaimer - Our bot is currently under development, if you find errors, bugs or anything in relation to feedback please make a report about it with specifics using the bf!report command.]
$title[Hey there! Thanks for inviting me! :D]
$color[GREEN]
$description[You can find some very important and useful information below!

$addField[Bot Statistics; 

**Staff Statistics**

\`\`\`$getvar[developers] Developers,
$getvar[administrators] Bot Administrators,
$getvar[banmoderators] Ban Moderators\`\`\`

**User Statistics**

\`\`\`$allmemberscount Users,
$getvar[blacklists] Blacklisted Users\`\`\` 

**Server Statistics**
\`\`\`$servercount Servers
$getvar[serverblacklists] Server Blacklists\`\`\`]]
`
})
bot.joinCommand({
channel:"$getservervar[wchannel]",
code:`$eval[$getservervar[wmessage]]
$if[$getuservar[sbd]==false]
$setuservar[cf;$getservervar[cf]]
$setuservar[bank;$getservervar[sb]]
$setuservar[sbd;true]
$else
$endif`})
}
module.exports.id = "Callbacks"