module.exports = ({
name:"viewlock",
aliases:"vl",
category:"Mod",
explanation:"Disable reading messages for the specified role/user or the guild. Only executable by someone with the manage channels permissions.",
user:"Manage Channels",
bot:"Manage Channels",
usage:"viewlock [role/user]",
example:"viewlock bot-users",
explain:"View-locks the channel for the role **bot-users**. If it is a user, then it is view-locked for a user, else for the guild.",
code:`$if[$memberexists[$findmember[$message[1];no]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for a user!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __user__ <@$findmember[$message[1];no]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;-viewchannel;$findmember[$message[1];no]]
View-locked the channel **$channelname** for the __user__ **$usertag[$findmember[$message[1];no]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to me** in position of roles!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$authorid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to you** in position of roles!}{color:FF0000}]
$elseif[$roleexists[$findrole[$message]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for a role!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __role__ <@&$findrole[$message]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;-viewchannel;$findrole[$message]]
View-locked the channel **$channelname** for the __role__ **$rolename[$findrole[$message]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to me** in position!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to you** in position!}{color:FF0000}]
$endelseif
$else
$modifychannelperms[$channelid;-viewchannel;$guildid]
View-locked the channel **$channelname** for __the whole server__!
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for the guild!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __whle guild__!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$endif
$onlybotperms[managechannels;{description:I do not have the required permissions! Required permissions#COLON# \`Manage Channels\`}{color:FF0000}]
$onlyperms[managechannels;{description:You do not have the permission \`Manage Channels\` to execute this!}{color:FF0000}]`})