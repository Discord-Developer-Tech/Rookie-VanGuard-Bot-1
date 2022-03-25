module.exports = ({
	name: "oogway",
	category:"Images",
	code: `
	$argsCheck[>1;Provide Something]
	$attachment[https://api.popcat.xyz/oogway?text=$uri[encode;$message];oogway.png]
	`
})