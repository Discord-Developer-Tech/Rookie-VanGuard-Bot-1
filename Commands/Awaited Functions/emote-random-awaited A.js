module.exports = {
    type: "awaitedCommand",
    name: "emotetrueb",
    code: `
$interactionReply[;{author:$userTag[$authorID]:$authorAvatar:}
{field:Name#COLON#:\`$getUserVar[emotenewname]\`:yes}
{image:$getUserVar[emoteimg]}
{footer:Status • Accepted}
{color:2FCB71};{actionRow:,2,3,tickyes,$getVar[byes],true:,2,4,tickno,$getVar[bno],true};0;7]
$addEmoji[$getUserVar[emoteimg];$getUserVar[emotenewname]]
$suppressErrors
`
}