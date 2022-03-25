module.exports = ({
  name: "scroll",
  category:"Images",
  code: `$attachment[https://api.devs-hub.xyz/truth?text=$replaceText[$message; ;+;-1];scroll.png]
  $argsCheck[>1;Provide some text]`
})