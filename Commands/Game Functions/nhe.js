module.exports = {
    name:"nhe" ,
    category:"Games",
    code:`
$djsEval[
const { NeverHaveIEver } = require('weky');
NeverHaveIEver({
    message: message,
    embed: {
        title: 'Never Have I Ever',
        color: '#000001',
        timestamp: true,
    },
    thinkMessage: 'I am thinking',
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttons: { optionA: 'Yes', optionB: 'No' },
})]`
    }
 