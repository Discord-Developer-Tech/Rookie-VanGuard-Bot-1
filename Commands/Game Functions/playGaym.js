module.exports = {
  name: 'playgame', 
  category:"Games",
  code: `$if[$checkcontains[$tolowercase[$message[1]];poker;pk]==true]
    $djseval[
      const { DiscordTogether } = require('discord-together');
      client.discordTogether = new DiscordTogether(client);
      client.discordTogether.createTogetherCode('$voiceID', 'poker').then(async invite => {
      return message.channel.send(invite.code);
    });]
    $elseif[$message==]
      Correct Usage: \`$getServerVar[prefix]playPoker poker\`
    $endelseif
    $else 
      Correct Usage: \`$getServerVar[prefix]playPoker poker\`
    $endif
    $onlyif[$voiceID!=; you need to be in a vc to do this]
    $onlyif[$hasperms[$authorID;speak]==true]
    $onlyIf[$message==poker;]  
  `
}