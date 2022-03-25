module.exports = {
  name: "dog",
  category:"Images",
  code: `$title[A cute doggo for $username]
  $attachment[$jsonRequest[https://api.toxy.ga/api/dog;url;An error occurred while retrieving the doggo];doggo.png]
  $image[attachment://doggo.png]
  $color[$getUserVar[embedColor]]`
}