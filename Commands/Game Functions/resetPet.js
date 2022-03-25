module.exports = {
  name: "reset-pet",
  aliases: ["resetPet"],
  category:"Games",
  code: `
    My total pets have been reset to 0 in $servername :\(
    $setServerVar[pet;0]
    $onlyPerms[manageserver;:x: You need \`Manage Server\` to do that]
  `
}