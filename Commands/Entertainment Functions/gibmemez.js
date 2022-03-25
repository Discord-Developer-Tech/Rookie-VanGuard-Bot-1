module.exports = ({
  name: "$alwaysExecute",
  category:"Fun",
  code: `$if[$checkContains[$message;give me a meme;gimme a meme]==true]
  $jsonRequest[https://api.popcatdev.repl.co/meme;image;API down haiyaa]
  $endif`
})