module.exports = ({
  name: "minecraft",
  category:"Images",
  aliases: ['mc', 'achievement'],
  code: `$attachment[https://api.cool-img-api.ml/achievement?text=$replaceText[$message; ;+;-1]]
  $argsCheck[>1;Provide some text please!]`
})