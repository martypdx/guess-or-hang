/* globals words */
/* exported guess */

var word = '';
var guessed = '';
var guessCount = 0;
var incorrectCount = 0;

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function loadWord() {
    var randomIndex = getRandomIndex(words.length);
    word = words[randomIndex];

    var spans = document.querySelectorAll('.word-letters span');
    var span;

    for(var i = 0; i < word.length; i++) {
        span = spans[i];
        span.textContent = word[i];
        span.classList.remove('hidden');
        span.classList.remove('revealed');
    }

    for(var j = word.length; j < spans.length; j++) {
        spans[j].classList.add('hidden');
    }

    guessed = '';
}

loadWord();

function guess() {
    var guessInput = document.getElementById('guess');
    var letter = guessInput.value.trim().toLowerCase();

    if(letter === '') {
        alert('No letter guessed!');
    }
    else if(guessed.includes(letter)) {
        alert('Already guessed ' + letter);
    }
    else {
        guessed += letter;
        guessCount++;
        document.getElementById('guess-count').textContent = guessCount;
        document.getElementById('guessed').textContent += ' ' + letter;
        guessInput.value = '';

        if(word.includes(letter)) {

            for(var i = 0; i < word.length; i++) {
                if(word[i] === letter) {
                    document.getElementById('letter-' + i).classList.add('revealed');
                }
            }

            // check for win!
            var win = true;
            for(var j = 0; j < word.length; j++) {
                if(!guessed.includes(word[j])) {
                    win = false;
                    break;
                }
            }

            if(win) {
                document.getElementById('message').textContent = 'you win!';
                document.getElementById('guess-btn').disabled = true;
            }
        }
        else {
            incorrectCount++;
            document.getElementById('part-' + incorrectCount).classList.remove('hidden');

            // check for loss
            if(incorrectCount >= 6) {
                document.getElementById('message').textContent = 'you lose (and die along the way)!';
                document.getElementById('guess-btn').disabled = true;
            }
        }
    }
}