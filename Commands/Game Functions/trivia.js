module.exports = {
    name:"trivia" ,
    category:"Games",
    code:`
$djsEval[
const { Trivia } = require('weky');
Trivia({
    message: message,
 
embed: {
        title: 'Trivia',
        description: 'You only have **{{time}}** to guess the answer!',
        color: '#000001',
        timestamp: true,
    },
    difficulty: 'hard',
    thinkMessage: 'I am thinking',
    winMessage:
        'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
    loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
    emojis: {
        one: '1️⃣',
        two: '2️⃣',
        three: '3️⃣',
        four: '4️⃣',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    returnWinner: false,
})]`
    }