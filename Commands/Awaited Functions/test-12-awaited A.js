module.exports = {
    type: "awaitedCommand",
    name: "test12",
    code: `
$authorID
$interactionReply[ok;;{actionRow:,2,3,yes,$getVar[byes],true:,2,4,no,$getVar[bno],true};0;7]
`
}