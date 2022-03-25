module.exports = (bot) => {
//Awaited Tickets
bot.awaitedCommand({
name:"solve",
code:`$closeticket[]
$onlyif[$getchannelvar[tsolve]==true;]
$wait[12h]
$editchannel[$channelid;$default;Solved-$username[$getchannelvar[topener]]-#$discriminator[$getchannelvar[topener]];$default;$default;$default;no]
$sendmessage[{author:Success!:$authoravatar}{description:Successfully marked the channel as solved. This ticket will be deleted in 12 hours!}{color:00FF00}{footer:Performed by $usertag};no]
$setchannelvar[tsolve;true]
$onlyif[$getchannelvar[tsolve]==false;This ticket is already solved!]`})

bot.awaitedCommand({
name:"unsolve",
code:`$setchannelvar[tsolve;false]
$editchannel[$channelid;$default;ticket-$username[$getchannelvar[topener]]-#$discriminator[$getchannelvar[topener]];$default;$default;$default;no]
$sendmessage[{author:Success!:$authoravatar}{description:Successfully marked the channel as un-solved! The ticket will not be deleted now!}{color:RED}{footer:Performed by $usertag};no]
$onlyif[$getchannelvar[tsolve]==true;This ticket is already unsolved!]`})

bot.awaitedCommand({
name:"modify",
code:`$reactioncollector[$splittext[1];$authorid;1m;$customemoji[$getvar[addmember]],$customemoji[$getvar[removemember]];add,remove;Time out! These buttons **won't** respond anymore!,,0]
$textsplit[$sendmessage[Modifying Ticket - Please click on the appropriate button, whether you would like to add someone/a role or remove someone/a role!;yes]; ]`})
bot.awaitedCommand({
name:"add",
code:`$awaitmessages[$authorid;1m;everything;am;Time up!]
Alright, please enter the role/user(preferrably IDs, if you are using names, ensure they are the exact names. Mentions too work.), so that I can add it to this channel!`})
bot.awaitedCommand({
name:"remove",
code:`$awaitmessages[$authorid;1m;everything;rm;Time up!]
Alright, please enter the role/user(preferrably IDs, if you are using names, ensure they are the exact names. Mentions too work.), so that I can remove them from this channel!`})
bot.awaitedCommand({
name:"rm",
code:`$if[$memberexists[$findmember[$message;no]]==true]
$modifychannelperms[$channelid;-viewchannel;$findmember[$message;no]]
Removed the __user__ **$usertag[$findmember[$message;no]]** from this channel!
$elseif[$roleexists[$findrole[$message]]==true]
$modifychannelperms[$channelid;-viewchannel;$findrole[$message]]
Removed the __role__ **$rolename[$findrole[$message]]** from this channel!
$endelseif
$else
Could not find the user/role!
$endif`})
bot.awaitedCommand({
name:"am",
code:`$if[$memberexists[$findmember[$message;no]]==true]
$modifychannelperms[$channelid;+viewchannel;$findmember[$message;no]]
Added the __user__ **$usertag[$findmember[$message;no]]** to this channel!
$elseif[$roleexists[$findrole[$message]]==true]
$modifychannelperms[$channelid;+viewchannel;$findrole[$message]]
Added the __role__ **$rolename[$findrole[$message]]** to this channel!
$endelseif
$else
Could not find the user/role!
$endif`})
bot.awaitedCommand({
name:"rename",
code:`Alright, please enter the new name for this ticket!
$awaitmessages[$authorid;1m;everything;rn;Time up!]`})
bot.awaitedCommand({
name:"rn",
code:`$editchannel[$channelid;$default;$message;$default;$default;$default;$default;yes]
Renamed the channel successfully!`})
bot.awaitedCommand({
name:"delete",
code:`Are you sure you want to confirm? This action cant be undone! Write in **yes** or **no**
$awaitmessages[$authorid;1m;yes,no;dyes,dno;Time up!]`})
bot.awaitedCommand({
name:"dyes",
code:`$closeticket[]`})
bot.awaitedCommand({
name:"dno",
code:`*Cancelled Successfully!*`})
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
bot.awaitedCommand({
name: "massfilter",
code: `$setUserVar[reactmessageid;;$clientID]
$resetServerVar[durationcache]
$resetServerVar[filters]
$suppressErrors`
})
bot.awaitedCommand({
name: "recentplay",
code: `$editMessage[$getUserVar[reactmessageid;$clientID];{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]\`
\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
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
{color:$getVar[color]}]
$textSplit[$songInfo[duration]; ]`
})
 
bot.awaitedCommand({
name: "recentshuffle",
code: `$loop[1;recentplay]
$wait[2s]
$editMessage[$getUserVar[reactmessageid;$clientID];{author:Shuffle Queue:$getVar[customemoji1]} {field:Requested By:<@$authorID>:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {description:\`$cropText[$queue[1;$queueLength;{number} - {title}];2000]\`} {color:$getVar[color]} {footer:Redirecting..} {timestamp}]
$shuffleQueue
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
})
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
code: `$loop[1;recentskipplay]
$setUserVar[nontrigger;1;$clientID]
$skipSong
$editMessage[$getUserVar[reactmessageid;$clientID];{title:$replaceText[$getVar[skip];{song};$songInfo[title]]}
{thumbnail:$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]}
{field:Starting Playing:\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`:yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
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
}
module.exports.id = "Awaited Functions"