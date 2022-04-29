const related = document.querySelector('#related')
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        related: 'images/4_RLP_MDG_071216ROSS_31JPG (1).jpg',
        question:'What is Ross\' profession?',
        choice1: 'Astronomer',
        choice2: 'Museum tour guide',
        choice3: 'Geologist',
        choice4: 'Palaeontologist',
        answer: 4,
    },
    {
        related: 'images/6ff10ebac2721697-600x338.jpg',
        question:'What does Chandler have to do to get Joey to forgive him, after having kissed Cathy?',
        choice1: 'Wear blue lipstick',
        choice2: 'Move to Yemen',
        choice3: 'Furnish their apartment',
        choice4: 'Lie in a wooden box for six hours',
        answer: 4,
    },
    {
        related: 'images/2734fd8af6549d24-600x338.jpg',
        question:'How many pages were in the letter Rachel wrote to Ross (front and back!)?',
        choice1: '14',
        choice2: '18',
        choice3: '3',
        choice4: '6',
        answer: 2,
    },
    {
        related: 'images/08friends-phoebe6-jumbo.jpg',
        question:'What is the next line in the song, “Monica, Monica, have a happy Hanukkah”?',
        choice1: 'And please tell Joey, Christmas will be snowy',
        choice2: 'Spin the dreidel, Rachel',
        choice3: 'Saw Santa Claus, he said hello to Ross',
        choice4: 'Went to the store, sat on Santa’s lap',
        answer: 3,
    },
    {
        related: 'images/phoebe-mike-david-friends-today-main-191210-3.jpg',
        question:'Which city did Phoebe’s boyfriend, David, move to?',
        choice1: 'Tulsa',
        choice2: 'London',
        choice3: 'Minsk',
        choice4: 'Yemen',
        answer: 3,
    },
    {
        related: 'images/MV5BNmU3ODAwNDctNDBmZi00MzY4LTg2MzMtODRmZDgxMjIzNjllXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg',
        question:'What was Monica’s nickname when she was a field hockey goalie?',
        choice1: 'Mon',
        choice2: 'Big Fat Goalie',
        choice3: 'Little Harmonica',
        choice4: 'Crazy Plate Lady',
        answer: 2,
    },
    {
        related: 'images/MV5BM2JkYjU5YTMtZmI5Yi00NTIxLWExYmEtNzlkODgwYTVhZjRhXkEyXkFqcGdeQXVyNDIzNDExOQ@@._V1_.jpg',
        question:'What is the ‘Gellar Cup’ made of?',
        choice1: 'A 3D woman coming out of a photo frame',
        choice2: 'A troll doll nailed to a two by four',
        choice3: 'A fruit bowl found in the garbage',
        choice4: 'A sock puppet shaped like a bunny',
        answer: 2,
    },
    {
        related: 'images/fede27a0c8fcdf47a4d39d1892669f8e.jpg',
        question:'What instrument is played at Phoebe and Mike’s wedding?',
        choice1: 'Harp',
        choice2: 'Recorder',
        choice3: 'Steel drums',
        choice4: 'Acoustic guidar',
        answer: 3,
    },
    {
        related: 'images/MV5BMTM4ODYyOTE0OV5BMl5BanBnXkFtZTgwNTIyODU0MDE@._V1_.jpg',
        question:'How do Rachel and Monica end up getting their apartment back from Chandler and Joey?',
        choice1: 'They swap it for Knicks tickets',
        choice2: 'They promise to squeeze fresh orange juice for them each morning',
        choice3: 'They give them their mattresses',
        choice4: 'They kiss for 1 minute',
        answer: 4,
    },
    {
        related: 'images/friends-trivia-18-matt-leblanc-aka-joey-tribbiani-auditioned-with-just-11-got-himself-this-after-his-first-paycheck-001.jpg',
        question:'What is Joey\'s catchphrase?',
        choice1: 'How are ya?',
        choice2: 'Hey what\'s up?',
        choice3: 'How you doin?',
        choice4: 'How\'s it hanging?',
        answer: 3,
    },
    {
        related: 'images/238922.jpg',
        question:'Which Friend dates Janice first?',
        choice1: 'Chandler',
        choice2: 'Joey',
        choice3: 'Gunther',
        choice4: 'Ross',
        answer: 1,
    },
    {
        related: 'images/Rachel-at-the-beach-house-with-her-friends.png',
        question:'What famous actor does Rachel go on date with after meeting him on a movie set?',
        choice1: 'Bruce Willies',
        choice2: 'Ben Stiller',
        choice3: 'Jean-Claude van Damme',
        choice4: 'Brat Pitt',
        answer: 3,
    },
    {
        related: 'images/43e290037280002f-1200x675.jpg',
        question:'Which famous actor’s butt does Joey play in a shower scene?',
        choice1: 'Bruce Willis',
        choice2: 'Charlton Heston',
        choice3: 'Jeff Goldblum',
        choice4: 'Al Pacino',
        answer: 4,
    },
    {
        related: 'images/hqdefault.jpg',
        question:'What is the name of Joey’s character in the commercial for opening milk cartons?',
        choice1: 'Mike',
        choice2: 'Kevin',
        choice3: 'Drake',
        choice4: 'Tommy',
        answer: 2,
    },
    {
        related: 'images/brad.jpg',
        question:'Brad Pitt and David Schwimmer’s characters cofounded what club in high school?',
        choice1: 'The "We Love Rachel Green Club."',
        choice2: 'The "I Hate Rachel Green Club."',
        choice3: 'The "We Hate Ross Geller Club."',
        choice4: 'The "I Love Monica Geller Club."',
        answer: 2
    }
]

let SCORE_POINTS = 0
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        if(score == 1000000) {
            return window.location.assign('/winner.html')
        }
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    related.innerHTML = "<img src=\"" + currentQuestion.related + "\" width=\"540\" height=\"360\">"
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            switch(questionCounter) {
                case 1:
                    SCORE_POINTS = 100
                    incrementScore(SCORE_POINTS)
                    break;
                case 2:
                    SCORE_POINTS = 200
                    incrementScore(SCORE_POINTS)
                    break;
                case 3:
                    SCORE_POINTS = 300
                    incrementScore(SCORE_POINTS)
                    break;
                case 4: 
                    SCORE_POINTS = 500
                    incrementScore(SCORE_POINTS)
                    break;
                case 5:
                    SCORE_POINTS = 1000
                    incrementScore(SCORE_POINTS)
                    break;
                case 6:
                    SCORE_POINTS = 2000
                    incrementScore(SCORE_POINTS)
                    break;
                case 7:
                    SCORE_POINTS = 4000
                    incrementScore(SCORE_POINTS)
                    break;
                case 8:
                    SCORE_POINTS = 8000
                    incrementScore(SCORE_POINTS)
                    break;
                case 9:
                    SCORE_POINTS = 16000
                    incrementScore(SCORE_POINTS)
                    break;
                case 10:
                    SCORE_POINTS = 32000
                    incrementScore(SCORE_POINTS)
                    break;
                case 11:
                    SCORE_POINTS = 64000
                    incrementScore(SCORE_POINTS)
                    break;
                case 12:
                    SCORE_POINTS = 125000
                    incrementScore(SCORE_POINTS)
                    break;
                case 13:
                    SCORE_POINTS = 250000
                    incrementScore(SCORE_POINTS)
                    break;
                case 14:
                    SCORE_POINTS = 500000
                    incrementScore(SCORE_POINTS)
                    break;
                case 15:
                    SCORE_POINTS = 1000000
                    incrementScore(SCORE_POINTS)
                    break;
                default:
                    SCORE_POINTS = 0
                    incrementScore(SCORE_POINTS)
                    break;
            }
            
            
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
        
        if(classToApply === 'incorrect'){
            localStorage.setItem('mostRecentScore', score)
            return window.location.assign('/end.html')
        }
    })
})

incrementScore = num => {
    score =num
    scoreText.innerText = score
}
startGame()

var modal = document.getElementById("Rules");

var span = document.getElementsByClassName("close")[0];

window.onload = function () {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}