module.exports = ({
  name: "billy",
  category:"Images",
  code: `$attachment[https://api.berk404.ga/billy?text=$replaceText[$message; ;+;-1];billy.png]
  $argsCheck[>1;Insert some text]`
})