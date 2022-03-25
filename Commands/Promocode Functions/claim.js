module.exports = {
name: "promocode",
code: `
$if[$message==$getGlobalUserVar[promocodes]]
<:sender:904162273650704414> **$username claimed their promocode**
In total your promocode gave you
<:souls:906261681867464814> \`$random[3;10]\`
$getGlobalUserVar[simbol] \`$random[400;1500]\`
$customEmoji[gtrophy;902955744440254464] \`$random[1;2]\`
:cow2: \`$random[10;25]\`
$setGlobalUserVar[promocodes;~~~loop5575765#%&@@@!!1]
$deletecommand
$setGlobalUserVar[cash;$sum[$getGlobalUserVar[cash];$random[400;1500]]]
$setGlobalUserVar[soul;$sum[$getGlobalUserVar[soul];$random[3;10]]]
$setGlobalUserVar[trophy;$sum[$getGlobalUserVar[trophy];$random[1;2]]]
$setGlobalUserVar[cow;$sum[$getGlobalUserVar[cow];$random[10;25]]]
$else
:x: promocode is invalid
$deletecommand
$endif`}