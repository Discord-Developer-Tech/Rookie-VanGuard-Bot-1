module.exports = {
    name:"fasttype" ,
    category:"Games",
    code:`
$djsEval[
const { FastType } = require('weky');
FastType({
    message: message,
    embed: {
        title: 'FastType',
        description: 'You have **{{time}}** to type the below sentence.',
        color: '#000001',
        timestamp: true
    },
    sentence: 'This is the sentence :)',
    winMessage: 'GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.',
    loseMessage: 'Better luck next time!',
    cancelMessage: 'You ended the game!',
    time: 60000,
    buttonText: 'Cancel',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
})]`
    }