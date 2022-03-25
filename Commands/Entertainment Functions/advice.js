module.exports = ({
  name: "advice",
  category:"Fun",
  code: `$title[Random advice]
$description[$jsonRequest[https://api.adviceslip.com/advice;slip.advice;e]]
$thumbnail[$getservervar[pfp]]
  $color[$getUserVar[embedColor]]`
})