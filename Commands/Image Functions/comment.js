module.exports = {
  name: "comment",
  category:"Images",
  code: `$attachment[https://some-random-api.ml/canvas/youtube-comment?avatar=$replaceText[$authoravatar;.webp;.png;-1]&username=$replaceText[$username; ;+;-1]&comment=$replaceText[$message; ;+;-1];comment.png]`
}