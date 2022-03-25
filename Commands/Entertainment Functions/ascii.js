module.exports = ({
  name: "ascii",
  category:"Fun",
  aliases: ['as'],
  code: `\`\`\`$httpRequest[https://artii.herokuapp.com/make?text=$replaceText[$message; ;+]]\`\`\`
`
})