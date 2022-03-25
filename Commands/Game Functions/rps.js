module.exports = {
    name:"rps" ,
    category:"Games",
    code:`
$djsEval[const opponent = mentions.users.first()
require('weky'). RockPaperScissors ({ 
embed: {
        title: 'Rock Paper Scissors',
        description: 'Press the button below to choose your element.',
        color: '#000001',
        timestamp: true,
    },
message: message,
opponent: opponent
})]`
    }