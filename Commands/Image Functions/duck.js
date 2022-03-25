module.exports = ({
  name: "duck",
  category:"Images",
  code: `$title[Quack quack!]
  $image[$jsonRequest[https://random-d.uk/api/random?format=json;url;An error haiyaa]]
  $color[$getUserVar[embedColor]]`
})