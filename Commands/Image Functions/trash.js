module.exports = {
  name: "trash",
  category:"Images",
  code: `$attachment[https://api.cool-img-api.ml/trash?image=$replaceText[$userAvatar[$mentioned[1;yes]];.webp;.png;-1;];trash.png]`
}