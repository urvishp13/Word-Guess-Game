var words = ["bat","dog"];
var tries = 12;
var guessedLetters = [];
var answer = [];

var word = "bat";
for (var i = 0; i < word.length; i++) {
  answer[i] = "_";
}

answerHTML = document.getElementById("answer");
triesHTML = document.getElementById("tries");
guessedLettersHTML = document.getElementById("guessedLetters");

answerHTML.textContent = answer;
triesHTML.textContent = "Tries: " + tries;
guessedLettersHTML = "Guessed letters: " + guessedLetters;

document.onkeyup = function(event) {
  console.log(event);

  var guessedLetter = event.key;
  for (var i = 0; i < word.length; i++) {
    if (guessedLetter === word[i]) {
      answer[i] = guessedLetter;
      answerHTML.textContent = answer;
    }
    else {
      tries = tries - 1;
      triesHTML.textContent = "Tries: " + tries;
      guessedLettersHTML = "Guessed letters: " + guessedLetters;
      guessedLetters.push(guessedLetter);
    }
  }
}