module.exports = {
    type: "awaitedCommand",
    name: "emotefalse",
    code: `
$interactionReply[;{author:$userTag[$authorID]:$authorAvatar:}
{field:ID#COLON#:\`$getUserVar[emoteid]\`:yes}
{field:Name#COLON#:\`$getUserVar[emotename]\`:yes}
{field:New Name#COLON#:\`$getUserVar[emotenewname]\`:yes}
{field:Guild#COLON#:\`$getUserVar[emoteguild]\`:yes}
{image:$getUserVar[emoteimg]}
{footer:Status • Declined}
{color:E64D3E};{actionRow:,2,3,tickyes,$getVar[byes],true:,2,4,tickno,$getVar[bno],true};0;7]
$suppressErrors
`
}