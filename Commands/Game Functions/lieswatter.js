module.exports = {
    name:"lieswatter" ,
    category:"Games",
    code:`
$djsEval[
const { LieSwatter } = require('weky');
LieSwatter({
    message: message,
    embed: {
        title: 'Lie Swatter',
        color: '#000001',
        timestamp: true,
    },
    thinkMessage: 'I am thinking',
    winMessage:
        'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
    loseMessage: 'Better luck next time! It was a **{{answer}}**.',
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttons: { true: 'Truth', lie: 'Lie' },
})]`
    }