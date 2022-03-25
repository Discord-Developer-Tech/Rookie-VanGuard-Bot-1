module.exports = (bot) => {
bot.status({
  text: " \on $servercount Communities | Watching $allmemberscount Friends!",
  type: "STREAMING",
  url: "https://www.youtube.com/watch?v=I6SksxyOFrk",
  time: 12
});
bot.status({
	text: ' to development in progress!',
	type: 'LISTENING',
	time: 12
});
bot.status({
	text: ' to $getvar[s] sent suggestions in $servercount servers!',
	type: 'LISTENING',
	time: 12
});

}
module.exports.id = "Bot Status"