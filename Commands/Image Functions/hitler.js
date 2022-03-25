module.exports = ({
  name: "hitler",
  category:"Images",
  code: `$attachment[https://api.becoditive.xyz/v2/images/hitler?image=$replaceText[$replaceText[$userAvatar[$mentioned[1;yes]];webp;png;1];gif;png;-1];hitler.png]`
})