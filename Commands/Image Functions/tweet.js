module.exports = ({
name: "tweet",
category:"Images",
code: `$attachment[https://api.willz.repl.co/image/tweet?text=$replaceText[$message; ;+]&image=$replaceText[$authorAvatar;.webp?size=4096;.png]&username=$replaceText[$nickname; ;+]]`
})