module.exports = ({
 name: "gun",
 category:"Images",
 code: `$attachment[https://api.devs-hub.xyz/gun?image=$replaceText[$userAvatar[$mentioned[1;yes]];webp;png;-1];gun.png]`
})