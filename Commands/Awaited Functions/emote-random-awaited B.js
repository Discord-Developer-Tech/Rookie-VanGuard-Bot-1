module.exports = {
    type: "awaitedCommand",
    name: "emotetrueb",
    code: `
$interactionReply[;{author:$userTag[$authorID]:$authorAvatar:}
{field:Name#COLON#:\`$getUserVar[emotenewname]\`:yes}
{image:$getUserVar[emoteimg]}
{footer:Status • Declined}
{color:E64D3E};{actionRow:,2,3,tickyes,$getVar[byes],true:,2,4,tickno,$getVar[bno],true};0;7]
$suppressErrors
`
}