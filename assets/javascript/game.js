var lettersGuessedArea = document.getElementById('letters-guessed');

var guessesLeftArea = document.getElementById('guesses-left');
var newSetOfGuesses = guessesLeftArea.innerHTML; // Capture the starting number of guesses

// Grab the display of the word (with the blanks) in the game
var display = document.getElementById('word');

var artistForGame;
// storage of Artist names with URL to their song
var storage = ['beyonce','kendrick lamar','jay-z','justin timberlake','ed sheeran','j. cole','rihanna','ariana grande',
'dua lipa'];

// Create new game settings
function startNewGame(newSetOfGuesses) {
    // Clear display
    display.innerHTML = "";
    // Clear letters guessed
    lettersGuessedArea.innerHTML = "";
    // Reset guesses to starting number of guesses
    guessesLeftArea.innerHTML= newSetOfGuesses;
    // Choose new Artist name from storage
    artistForGame = storage[Math.floor(Math.random() * storage.length)];
    // Display the Artist name with blanks instead of letters
        // Add the string `_ ` n number of times with the end trimmed --> n is the length of the name
    display.innerHTML = getBlanksForDisplay(artistForGame).trimEnd();
}

function getBlanksForDisplay(name) {

    function isLetter(char) {
        if (char >= "a" && char <= "z") {
            return true;
        }
        return false;
    }
    
    let charArrayOfName = name.split("");
    //console.log(charArrayOfName);
    let s = "";
    charArrayOfName.forEach(element => {
        //console.log(`${element}: ` + isLetter(element));
        if (isLetter(element)) {
            s += "_ ";
        }
        else {
            s += `${element} `;
        }
    });
    return s;
}

// Used to replace the underscore in the display with the correctly guessed letter
function replaceBlankAt(index,letterCorrectlyGuessed) {
    
    function findAllWordIndeces(name) {
        let spaceIndeces = [];
        for (let i = 0; i < name.length; i++) {
            if (name.charAt(i) === " ") {
                spaceIndeces.push(i);
            }
        }
        return spaceIndeces;
    }
    
    //console.log(display.innerHTML);
    let arrayOfDisplayLetters = display.innerHTML.split(" ");

    // Find the word the letter is in
    let wordsInName = findAllWordIndeces(artistForGame);
    //console.log("wordsInName: " + wordsInName);
    let wordIn = 0;
    for (let i = 0; i < wordsInName.length; i++) {
        if (index > wordsInName[i]) {
            wordIn = i+1;
        }
        else {
            break;
        }
    }
    arrayOfDisplayLetters[index+wordIn] = letterCorrectlyGuessed;

    //console.log("display splited after insertion: " + arrayOfDisplayLetters);
    display.innerHTML = arrayOfDisplayLetters.join(" ");
    //console.log("rejoined display: " + display.innerHTML);
}

// Start the first game
startNewGame(newSetOfGuesses);

// When Player guesses letter in Artist's name i.e. pressing a key
document.addEventListener('keydown', (event) => {
    //console.log(artistForGame);
    //console.log(display.innerHTML);
    //console.log("letter pressed: " + event.key);
    let letterGuessed = event.key;
    // If letters in name still need to be guessed
    if (display.innerHTML.includes("_")) {
        if (isNaN(letterGuessed) && letterGuessed.toLowerCase() === letterGuessed) { // make sure only lowercase letter keys are pressed
            document.getElementById('realtime-game-info').innerHTML = "";
            // If a repeat letter is guessed
            if (lettersGuessedArea.innerHTML.includes(letterGuessed) || display.innerHTML.includes(letterGuessed)) {
                document.getElementById('realtime-game-info').innerHTML = "You guessed that letter already";
                return;
            }
            // If letter guessed is in name
            if (artistForGame.includes(letterGuessed)) {
                // Find the index of the letter in the name - find all repetitions of letter --> O(n) - linear traversal of name
                // Use the formula 2*index-1 to find index to insert letter in display
                let index = artistForGame.indexOf(letterGuessed); // the first occurrence of the letter in the name. because this is guaranteed at this point
                do {
                    replaceBlankAt(index, letterGuessed);
                    index = artistForGame.indexOf(letterGuessed, index+1); // starting search for next repetiion of guessed letter
                } while (index != -1);
            }
            // If letter guessed isn't in name
            else {
                // Add letter guessed to letter-guessed-area
                lettersGuessedArea.textContent += `${letterGuessed}, `;
                // Decrement guesses avaiable by 1
                document.getElementById('guesses-left').innerHTML--;
                let numberOfGuesses = guessesLeftArea.innerHTML;
                // If ran out of guesses
                if (numberOfGuesses == 0) { // double == rather than triple === because numberOfGuesses is a string
                    // Display what happened in previous game
                    document.getElementById('realtime-game-info').innerHTML = 
                    `<p>You Lost</p>
                     <p style="text-decoration: underline;">Previous Game Answer</p>
                     <p>${artistForGame}</p>
                     `;
                    // Start a new game
                    startNewGame(newSetOfGuesses);
                }
            }
        }
    }
    // If name fully guessed
    if (!display.innerHTML.includes("_")) {
        // YOU WON!
        // Display what happened in previous game
        document.getElementById('realtime-game-info').innerHTML = 
        `<p>You Won!</p>
         <p style="text-decoration: underline;">Previous Game Answer</p>
         <p>${artistForGame}</p>
         `;
        document.getElementById('wins').innerHTML++;
        // Display image of Artist
        // Start new game 
        startNewGame(newSetOfGuesses);
    }
});