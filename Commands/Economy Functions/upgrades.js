module.exports = {
name: "upgrade",
code: `
$if[$getGlobalUserVar[iron_pickaxe]==1]
$author[Upgraded!!!!;https://cdn.discordapp.com/emojis/911934684894744626.png?size=128]
$thumbnail[https://cdn.discordapp.com/emojis/911934684894744626.png?size=128]
$color[RED]
$description[**You upgraded from <:iron:911934565516443649> to <:golden:911934684894744626> which costed** \`70\`<:bronze:911929393214013501> **and** \`2,500\`$getservervar[simbol]]
$setGlobalUserVar[wood_pickaxe;0]
$setGlobalUserVar[iron_pickaxe;0]
$setGlobalUserVar[cash;$sub[$getGlobalUserVar[cash];2500]]
$setGlobalUserVar[bronze_ore;$sub[$getGlobalUserVar[bronze_ore];70]]
$setGlobalUserVar[gold_pickaxe;1]
$setGlobalUserVar[gold_durability;20]
$onlyIf[$getGlobalUserVar[bronze_ore]>=70;You need \`70\`<:bronze:911929393214013501>]
$onlyIf[$getGlobalUserVar[cash]>=2500; you need \`2,500\`$getservervar[simbol]]

$else

$if[$getGlobalUserVar[gold_pickaxe]==1]
$author[Upgraded!!!!;https://cdn.discordapp.com/emojis/911934684894744626.png?size=128]
$thumbnail[https://cdn.discordapp.com/emojis/911934684894744626.png?size=128]
$color[RED]
$description[**You upgraded from <:golden:911934684894744626> to <:diamond:911934710807142441> which costed** \`35\`<:gold:911929526940991508> **and** \`10,000\`$getservervar[simbol]]
$setGlobalUserVar[wood_pickaxe;0]
$setGlobalUserVar[gold_pickaxe;0]
$setGlobalUserVar[iron_pickaxe;0]
$setGlobalUserVar[cash;$sub[$getGlobalUserVar[cash];10000]]
$setGlobalUserVar[gold_ore;$sub[$getGlobalUserVar[gold_ore];35]]
$setGlobalUserVar[diamond_pickaxe;1]
$setGlobalUserVar[diamond_durability;25]
$onlyIf[$getGlobalUserVar[gold_ore]>=35;You need \`35\`<:gold:911929526940991508>]
$onlyIf[$getGlobalUserVar[cash]>=10000; you need \`10,000\`$getservervar[simbol]]
$endif
$endif`}