module.exports = {
name: "mine",
code: `
$if[$getGlobalUserVar[iron_pickaxe]==1]
$color[RED]
$description[
<:redot:911928745533771776> **$username** you mined <:iron:911929448343932989>**$random[1;10]x** iron <:bronze:911929393214013501>**$random[1;9]x** bronze thanks to your $get[emote11]iron pickaxe 
<:redot:911928745533771776> Now you have <:bronze:911929393214013501>$random[1;9]x <:iron:911929448343932989>$random[1;10]x <:gold:911929526940991508>0x <:diamonddd:911929573443264542>0x
<:redot:911928745533771776> Durability: [$replaceText[$get[durability11];$get[durability11];$repeatMessage[$get[durability11];■]]](https://discord.com/api/oauth2/authorize?client_id=911634451853881404&permissions=8&scope=applications.commands%20bot)]

$setGlobalUserVar[iron_ore;$sum[$getGlobalUserVar[iron_ore];$random[1;10]]]
$setGlobalUserVar[bronze_ore;$sum[$getGlobalUserVar[bronze_ore];$random[1;9]]]
$setGlobalUserVar[iron_durability;$sub[$getGlobalUserVar[iron_durability];1]]
$onlyIf[$get[durability11]>=1;Your $get[emote11] durability is at 0 go upgrade it or buy a new pickaxe]
$let[durability11;$getGlobalUserVar[iron_durability]]
$let[emote11;<:iron:911934565516443649>]

$else

$if[$getGlobalUserVar[gold_pickaxe]==1]
$color[RED]
$description[
<:redot:911928745533771776> **$username** you mined <:iron:911929448343932989>**$random[1;10]x** iron <:bronze:911929393214013501>**$random[1;9]x** bronze <:gold:911929526940991508>**$random[1;15]x** gold thanks to your $get[emote111]golden pickaxe 
<:redot:911928745533771776> Now you have <:bronze:911929393214013501>$random[1;10]x <:iron:911929448343932989>$random[1;10]x <:gold:911929526940991508>$random[1;15]x <:diamonddd:911929573443264542>0x
<:redot:911928745533771776> Durability: [$replaceText[$get[durability111];$get[durability111];$repeatMessage[$get[durability111];■]]](https://discord.com/api/oauth2/authorize?client_id=911634451853881404&permissions=8&scope=applications.commands%20bot)]

$setGlobalUserVar[iron_ore;$sum[$getGlobalUserVar[iron_ore];$random[1;10]]]
$setGlobalUserVar[gold_ore;$sum[$getGlobalUserVar[gold_ore];$random[1;15]]]
$setGlobalUserVar[bronze_ore;$sum[$getGlobalUserVar[bronze_ore];$random[1;9]]]
$setGlobalUserVar[gold_durability;$sub[$getGlobalUserVar[gold_durability];1]]
$onlyIf[$get[durability111]>=1;Your $get[emote111] durability is at 0 go upgrade it or buy a new pickaxe]
$let[durability111;$getGlobalUserVar[gold_durability]]
$let[emote111;<:golden:911934684894744626>]
$else
$if[$getGlobalUserVar[diamond_pickaxe]==1]
$color[RED]
$description[
<:redot:911928745533771776> **$username** you mined <:iron:911929448343932989>**$random[1;10]x** iron <:bronze:911929393214013501>**$random[1;9]x** bronze <:gold:911929526940991508>**$random[1;15]x** gold <:diamonddd:911929573443264542>**$random[1;7]x** diamonds thanks to your $get[emote1111]diamond pickaxe 
<:redot:911928745533771776> Now you have <:bronze:911929393214013501>$random[1;9]x <:iron:911929448343932989>$random[1;10]x <:gold:911929526940991508>$random[1;15]x <:diamonddd:911929573443264542>$random[1;7]x
<:redot:911928745533771776> Durability: [$replaceText[$get[durability1111];$get[durability1111];$repeatMessage[$get[durability1111];■]]](https://discord.com/api/oauth2/authorize?client_id=911634451853881404&permissions=8&scope=applications.commands%20bot)]
$setGlobalUserVar[diamond_ore;$sum[$getGlobalUserVar[diamond_ore];$random[1;7]]]
$setGlobalUserVar[gold_ore;$sum[$getGlobalUserVar[gold_ore];$random[1;15]]]
$setGlobalUserVar[iron_ore;$sum[$getGlobalUserVar[iron_ore];$random[1;10]]]
$setGlobalUserVar[bronze_ore;$sum[$getGlobalUserVar[bronze_ore];$random[1;9]]]
$setGlobalUserVar[diamond_durability;$sub[$getGlobalUserVar[diamond_durability];1]]
$onlyIf[$get[durability1111]>=1;Your $get[emote1111] durability is at 0 go upgrade it or buy a new pickaxe]
$let[durability1111;$getGlobalUserVar[diamond_durability]]
$let[emote1111;<:diamond:911934710807142441>]
$endif
$endif
$endif
$suppressErrors[ {error}]
$globalCooldown[30s; wait %time%]`}