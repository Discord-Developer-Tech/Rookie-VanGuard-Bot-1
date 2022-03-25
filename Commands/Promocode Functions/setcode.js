module.exports = {
name: "promo",
code: `
$sendDM[$findUser[$message];**Hey you got a promocode from **\`$userTag[$botownerid]\` **make sure to claim it  soon
Promocode:** ||$randomString[6]||]
$channelSendMessage[$channelID;**successfully gave** \`$usertag[$findUser[$message]]\` **their promocode check your dms** \`$username\`]
$senddm[$authorid;Promocode is ||$randomString[6]||]
$deleteCommand
$deleteIn[60s]
$cooldown[3s;wait \`%time\`]
$setGlobalUserVar[promocodes;$randomString[6];$get[user]]
$let[user;$findUser[$message]]
$onlyIf[$isbot[$findUser[$message]]==false;:x: i cant dm bots and they wont respond back so no]
$onlyForIDS[$botownerid;896846485805744168;:x: only for my devs]`}