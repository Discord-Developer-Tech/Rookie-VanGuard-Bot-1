module.exports = [{
  name: "play",
  category:"Music",
  aliases: ["youtube", "p", "yt"],
  cooldown: "3s",
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
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
$cooldown[$commandInfo[play;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "playskip",
  category:"Music",
  aliases: ["ps"],
  cooldown: "3s",
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
$cooldown[$commandInfo[playskip;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$queueLength>=1;Require **1 song** to run it.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "soundcloud",
  category:"Music",
  aliases: ["sc"],
  cooldown: "3s",
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
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
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[soundcloud;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please put link song that from soundcloud.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "download",
  category:"Music",
  cooldown: "3s",
  code: `$if[$checkContains[$songInfo[url] $suppressErrors;https://soundcloud.com/]==true]
$attachment[$getServerVar[linkdownload];$cropText[$songInfo[title];28]_128_Bitrate.mp3]
$onlyIf[$checkContains[$getServerVar[linkdownload];playlist.m3u8]!=true;no download song available.]
$endif
$if[$toLowercase[$message]==]
$color[$getVar[color]]
$image[attachment://$random[1000;1000000]-thumbnail.png]
$attachment[$songInfo[thumbnail];$random[1000;1000000]-thumbnail.png]
$sendMessage[Downloading..;no]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseIf[$toLowercase[$message]==--refresh]
$addCmdReactions[✅]
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$onlyIf[$checkContains[$songInfo[url];https://soundcloud.com/]!=false;Only for SoundCloud.]
$endelseif
$endif
$onlyBotPerms[attachfiles;Missing Permission **Attach Files** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[download;cooldown];Please wait **%time%** before using again.]`
}, {
  name: "user",
  category:"Music",
  cooldown: "3s",
  code: `$setServerVar[userid;$mentioned[1]]
$description[\`$userTag[$mentioned[1]]\` just only can execute command now.]
$addTimestamp
$color[$getVar[color]]
$addCmdReactions[✅]
$onlyIf[$isBot[$mentioned[1]]!=true;Failed.]
$onlyIf[$mentioned[1]!=;Failed.]
$argsCheck[1;Mention someone]
$cooldown[$commandInfo[user;cooldown];Please wait **%time%** before using again.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
}, {
  name: "user-disable",
  category:"Music",
  cooldown: "3s",
  code: `$setServerVar[userid;default]
$description[Change to default.]
$color[$getVar[color]]
$addCmdReactions[✅]
$addTimestamp
$onlyIf[$getServerVar[userid]!=default;Already default!]
$cooldown[$commandInfo[user-disable;cooldown];Please wait **%time%** before using again.]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
}, {
 name: "musicsettings",
 category:"Music",
 aliases: ["musicsetting", "musicset"],
 cooldown: "3s",
 code: `$if[$message[1]==]
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
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[musicsettings;cooldown];Please wait **%time%** before using again.]`
}, {
name: "filter",
category:"Music",
cooldown: "3s",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
3  ) bass, pitch, speed
29 ) 3d, 8d, 8d-v2, double, delay, chorus, clarity, deep, distorted, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x
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
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[$commandInfo[filter;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]`
}, {
  name: "check",
  category:"Music",
  cooldown: "3s",
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
$cooldown[$commandInfo[check;cooldown];Please wait **%time%** before using again.]`
}, {
  name: "user-info",
  category:"Music",
  cooldown: "3s",
  code: `$author[$username[$findUser[$message;yes]]#$discriminator[$findUser[$message;yes]];$userAvatar[$findUser[$message;yes]]]
$addField[Command Used;\`$numberSeparator[$getGlobalUserVar[commanduserused;$findUser[$message;yes]];.]\`;yes]
$addField[Song Played;\`$numberSeparator[$getGlobalUserVar[userused;$findUser[$message;yes]];.]\`;yes]
$addField[Created At; \`$creationDate[$findUser[$message;yes];date]\`;yes]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[user-info;cooldown];Please wait **%time%** before using again.]
$onlyIf[$isBot[$findUser[$message;yes]]!=true;{description:\`❌ Oops.. looks like we cant collect data user.\`} {color:$getVar[color]}]`
}, {
  name: "seek",
  category:"Music",
  cooldown: "3s",
  code: `$if[$toLowercase[$message[2]]==save]
$addField[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$message[1];1000];10]!=];false;0 second];true;$humanizeMS[$multi[$message[1];1000];10]]\`;one-time use saving seek.]
$footer[Value: $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[saveseek;$message[1]]
$seekTo[$message[1]]
$onlyIf[$message[1]!=0;You cant.]
$else
$description[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0 second];true;$humanizeMS[$multi[$noMentionMessage;1000];10]]\`]
$footer[Value: $noMentionMessage]
$color[$getVar[color]]
$wait[$sum[$multi[$botPing;1;2;3];$dbPing]]
$seekTo[$noMentionMessage]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[1];-]!=true;You cant seek negative.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[>1;Usage: \`seek (number)\`]
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[seek;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "join",
  category:"Music",
  aliases: ["j", "summon"],
  cooldown: "3s",
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
$cooldown[$commandInfo[join;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}, {
  name: "rejoin",
  category:"Music",
  aliases: ["reconnect"],
  cooldown: "3s",
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
$cooldown[$commandInfo[rejoin;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}, {
  name: "disconnect",
  category:"Music",
  aliases: ["dc", "bye", "leave"],
  cooldown: "3s",
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
$cooldown[$commandInfo[disconnect;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}, {
  name: "slash",
  category:"Music",
  cooldown: "3s",
  code: `$createSlashCommand[$guildID;play;Play song;song:Support YouTube & Soundcloud:true:3]
$createSlashCommand[$guildID;filter;For list, just leave blank;filter:Use FIlter:false:3]
$createSlashCommand[$guildID;resume;Resume Song]
$createSlashCommand[$guildID;pause;Pause Song]
$createSlashCommand[$guildID;stop;Stop Song]
$title[Successfully created]
$description[You can use slash command now.] $color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[slash;cooldown];Please wait **%time%** before using again.]
$onlyPerms[manageserver;You didnt have permission **Manage Server**.]
$suppressErrors[failed.]`
}, {
  name: "pause",
  category:"Music",
  cooldown: "3s",
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
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "resume",
  category:"Music",
  cooldown: "3s",
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
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "loop",
  category:"Music",
  aliases: ["l", "loopsong", "loopmusic"],
  cooldown: "3s",
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
$cooldown[$commandInfo[loop;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
}, {
  name: "qloop",
  category:"Music",
  aliases: ["ql", "loopqueue"],
  cooldown: "3s",
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
$cooldown[$commandInfo[qloop;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
}, {
  name: "reboot",
  category:"Music",
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
}, {
  name: "pruning",
  category:"Music",
  cooldown: "3s",
  code: `$description[$replaceText[$replaceText[$checkCondition[$pruneMusic==true];true;Pruning now **on**];false;Pruning now **off**]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[pruning;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "shuffle",
  category:"Music",
  aliases: ["sf"],
  cooldown: "3s",
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
$cooldown[$commandInfo[shuffle;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "shuffleskip",
  category:"Music",
  aliases: ["sfs"],
  cooldown: "3s",
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$endif
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[shuffleskip;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "remove",
  category:"Music",
  aliases: ["r"],
  cooldown: "3s",
  code: `$moveSong[$sum[$message[1];1];]
$title[$replaceText[$getVar[remove];{d-amount};$replaceText[$message[1];-;]]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$message[1]<=$sub[$queueLength;1];Only have **$queueLength song**.]
$onlyIf[$message[1]>1;You cant remove at first song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[remove;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`remove (numnber song on queue)\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}, {
  name: "nowplaying",
  category:"Music",
  aliases: ["np"],
  cooldown: "3s",
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
$addField[Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$filterMessage[$filterMessage[$splitText[9];(];)]]\`;yes]
$addField[Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$filterMessage[$filterMessage[$splitText[6];(];)]]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration] $songInfo[current_duration] $songInfo[duration_left]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[nowplaying;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "stop",
  category:"Music",
  cooldown: "3s",
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
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}, {
  name: "skip",
  category:"Music",
  aliases: ["s"],
  cooldown: "3s",
  code: `$if[$message[1]==]
$skipSong
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
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
$cooldown[$commandInfo[skip;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}, {
  name: "clearqueue",
  category:"Music",
  aliases: ["cq"],
  cooldown: "3s",
  code: `$awaitReaction[$authorID;15s;{title:Are you sure you wanna clear?} {footer:Song#COLON# $queueLength} {color:$getVar[color]};✅,❌;clearqueueyes,clearqueueno;Confirmation failed.;yes]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[clearqueue;cooldown];Please wait **%time%** before using again.]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]`
}, {
  name: "top",
  category:"Music",
  cooldown: "3s",
  code: `$awaitMessages[$authorID;15s;$random[13000;50000];top;Confirmation failed.]
$description[Verification first]
$footer[Code: $random[13000;50000]]
$color[$getVar[color]]
$onlyIf[$globalUserLeaderboard[userused;asc]!=;Seems like, this leaderboard was empty..]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[$commandInfo[top;cooldown];Please wait **%time%** before using again.]
$onlyBotPerms[managemessages;Missing Permission, **Manage Messages** - Bot]`
}, {
  name: "queue",
  category:"Music",
  aliases: ["q"],
  cooldown: "3s",
  code: `$author[Queue;$getVar[customemoji1]]
$addField[Page $replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage] - $truncate[$sum[$divide[$queueLength;10];0.9]] ($abbreviate[$charCount[$queue[1;$queueLength;{number} - {title}]]]);$queue[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];10;\`{number} - {title}\`]]
$addField[Estimated Next Playing;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Next Requested By;<@$songInfo[userID;1]>;yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$addField[Total Duration;\`$replaceText[$formatDate[$filterMessage[$filterMessage[$multi[$sum[$splitText[4];$splitText[7]];1000];(];)];mm:ss];0:;00:]\`;yes]
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
$onlyIf[$queueLength!=1;{author:Currently Playing:$getVar[customemoji1]} {title:$songInfo[title]} {url:$songInfo[url]} {footer:$songInfo[publisher]:$songInfo[thumbnail]} {field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]\`:yes} {field:Duration Left:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[6];(];)]==00:00:00];true;LIVE];false;$filterMessage[$filterMessage[$splitText[3];(];)]]]\`:yes} {thumbnail:$songInfo[thumbnail]} {color:$getVar[color]}]
$if[$queueLength==1]
$textSplit[$songInfo[duration_left] $songInfo[duration]; ]
$else
$textSplit[$songInfo[duration_left] $songInfo[duration] $songInfo[duration;1]; ]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[queue;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}, {
name: "playlist",
category:"Music",
cooldown: "3s",
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
$cooldown[$commandInfo[playlist;cooldown];Please wait **%time%** before using again.]`
}, {
name: "playlist-add",
category:"Music",
cooldown: "3s",
code: `$setGlobalUserVar[$message[1];$messageSlice[1]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==];true;Add];false;Replace]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$message[1];-;]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[playlist-add;cooldown];Please wait **%time%** before using again.]
$argsCheck[>2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
}, {
name: "playlist-remove",
category:"Music",
cooldown: "3s",
code: `$setGlobalUserVar[$message[1];]
$title[Your song has remove on $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[$message[1]]!=null;Already remove!]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[playlist-remove;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-remove (number playlist)\`]
$suppressErrors[something just happened.]`
}, {
name: "playlist-play",
category:"Music",
cooldown: "3s",
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
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
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
$cooldown[$commandInfo[playlist-play;cooldown];Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-play (number playlist)\`]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]`
}, {
  name: "volume",
  category:"Music",
  aliases: ["v"],
  cooldown: "3s",
  code: `$volume[$message[1]]
$description[Change from \`$volume%\` to \`$message[1]%\` ($replaceText[$replaceText[$checkCondition[$cropText[$divide[$message[1];100];4]>=1];true;1];false;$cropText[$divide[$message[1];100];4]] dB)]
$footer[Max Volume: $getServerVar[maxvol]%]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$setGlobalUserVar[vol;$message[1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$message[1]<=$getServerVar[maxvol];Max volume $getServerVar[maxvol]%!]
$onlyIf[$charCount[$message[1]]<4;Failed.]
$onlyIf[$isNumber[$message[1]]==true;Must number!]
$argsCheck[1;{title:Volume can change 1 - $getServerVar[maxvol]} {footer:Volume#COLON# $volume%} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[volume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}]