module.exports = ({
  name: "grayscale",
  category:"Images",
  code: `$attachment[https://some-random-api.ml/canvas/greyscale?avatar=$replaceText[$useravatar[$mentioned[1;yes]];webp;png;-1];gray.png]`
})