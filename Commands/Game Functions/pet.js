module.exports = {
  name: "pet",
  category:"Games",
  code: `
    Thanks! I have been pet in Milk Gang a total of $getServerVar[pet] time\(s\)
    $setServerVar[pet;$sum[$getServerVar[pet];1]]
  `
}