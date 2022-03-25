module.exports = {
    name:"wyr" ,
    category:"Games",
    aliases:"wouldyourather" ,
    code:`
$djsEval[const { WouldYouRather } = require('weky');
WouldYouRather({
message: message,
    embed: {
        title: 'Would you rather...',
        color: '#000001',
        timestamp: true,
    },
    thinkMessage: 'I am thinking',
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttons: { optionA: 'Option A', optionB: 'Option B' },
})]`
    }