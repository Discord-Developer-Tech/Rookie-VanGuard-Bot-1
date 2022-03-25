module.exports = {
  name: "cmm",
  category:"Images",
  code: `$attachment[https://vacefron.nl/api/changemymind?text=$replaceText[$message; ;+;-1];changemymind.png]
  $argsCheck[>1;Insert some text you big dummy]`
}