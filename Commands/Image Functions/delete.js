module.exports = {
  name: "delete",
  category:"Images",
  code: `$attachment[https://api.devs-hub.xyz/delete?image=$replaceText[$userAvatar[$mentioned[1;yes]];.webp;.png;-1]&darkmode=$randomText[true;false];delete.png]`
}