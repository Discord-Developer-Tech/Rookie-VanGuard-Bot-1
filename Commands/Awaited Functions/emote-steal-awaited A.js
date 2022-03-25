module.exports = {
    type: "awaitedCommand",
    name: "emotetrue",
    code: `
$interactionReply[;{author:$userTag[$authorID]:$authorAvatar:}
{field:ID#COLON#:\`$getUserVar[emoteid]\`:yes}
{field:Name#COLON#:\`$getUserVar[emotename]\`:yes}
{field:New Name#COLON#:\`$getUserVar[emotenewname]\`:yes}
{field:Guild#COLON#:\`$getUserVar[emoteguild]\`:yes}
{image:$getUserVar[emoteimg]}
{footer:Status • Accepted}
{color:2FCB71};{actionRow:,2,3,tickyes,$getVar[byes],true:,2,4,tickno,$getVar[bno],true};0;7]
$addEmoji[$getUserVar[emoteimg];$getUserVar[emotenewname]]
$suppressErrors
`
}