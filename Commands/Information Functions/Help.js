module.exports = ({
name:"hnlp",
category:"Info",
explanation:"Just 1 Word - HELP!",
user:"None",
bot:"Embed Links",
usage:"help",
example:"help",
explain:"Gives all categories of the bot, click the appropriate emoji for info on the given category!",
code:`$sendmessage[{author:Help Is Approaching!:$authoravatar}{title:You asked, and im here. Here is a list of all 12 categories and $commandscount commands for you!}{color:BLUE}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Moderation Commands#COLON# $get[3]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Mod").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Utility Commands#COLON# $get[5]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Utility").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Info Commands#COLON# $get[2]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Info").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Misc Commands#COLON# $get[11]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Misc").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **RR Commands#COLON# $get[8]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "RR").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Levelling Commands#COLON# $get[7]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Levelling").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Welcome Commands#COLON# $get[6]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Welcome").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Music Commands#COLON# $get[12]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Music").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}   {field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Images Commands#COLON# $get[10]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Images").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Games Commands#COLON# $get[9]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Games").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`} {field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Economy Commands#COLON# $get[1]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Economy").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{field:$replacetext[$customemoji[$getvar[eticket]];:;#COLON#] **Fun Commands#COLON# $get[4]** $replacetext[$customemoji[$getvar[eticket]];:;#COLON#]:\`\`\`$getservervar[prefix]$djsEval[client.bot_commands.filter(x=>x.category == "Fun").map(x=>x.name).join(", $getservervar[prefix]");yes]\`\`\`}{footer:Help requested by $usertag | Bot by $usertag[$botownerid]:$authoravatar};no]
$let[1;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Economy").map(x=>x.name).join(", ");yes]; ]

$let[2;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Info").map(x=>x.name).join(", ");yes]; ]

$let[3;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Mod").map(x=>x.name).join(", ");yes]; ]

$let[4;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Fun").map(x=>x.name).join(", ");yes]; ]

$let[5;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Utility").map(x=>x.name).join(", ");yes]; ]

$let[6;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Welcome").map(x=>x.name).join(", ");yes]; ]

$let[7;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Levelling").map(x=>x.name).join(", ");yes]; ]

$let[8;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "RR").map(x=>x.name).join(", ");yes]; ]

$let[9;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Games").map(x=>x.name).join(", ");yes]; ]

$let[10;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Images").map(x=>x.name).join(", ");yes]; ]

$let[11;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Misc").map(x=>x.name).join(", ");yes]; ]

$let[12;$gettextsplitlength]
$textsplit[$djsEval[client.bot_commands.filter(x=>x.category == "Music").map(x=>x.name).join(", ");yes]; ]


$onlybotperms[embedlinks;I do not have permissions to embed links!]
$cooldown[3s;Woah there chill, you need to wait **%time%%**!]`})