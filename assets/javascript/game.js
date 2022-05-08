// Create new game settings
function startNewGame(newSetOfGuesses) {
    // Clear letters guessed
    document.getElementById('letters-guessed').innerHTML = "";
    // Reset guesses to starting number of guesses
    document.getElementById('guesses-left').innerHTML= newSetOfGuesses;
    // Choose new Artist name from storage
    var artistName = "beyonce";
    // Display the Artist name with blanks instead of letters
        // Add the string `_ ` n number of times with the end trimmed --> n is the length of the name
    document.getElementById('word').innerHTML = "_ ".repeat(artistName.length()).trimEnd();    
    
    return artistName;
}

/* Going to be used to add guessed letters to this area */
var lettersGuessedArea = document.getElementById('letters-guessed');

var guessesLeftArea = document.getElementById('guesses-left');
var newSetOfGuesses = guessesLeftArea.innerHTML;

// Grab the display of the word (with the blanks) in the game
var display = document.getElementById('word');

// Start the first game
var artistForGame = startNewGame(newSetOfGuesses);

// When Player guesses letter in Artist's name i.e. pressing a key
document.addEventListener('keydown', (event) => {
    console.log("letter pressed: " + event.key);
    let letterGuessed = event.key;
    // If name fully guessed
    if (!display.innerHTML.includes(_)) {
        // YOU WON!
        document.getElementById('wins').innerHTML++;
        // Reset the game 
        artistForGame = startNewGame(newSetOfGuesses);
    }
    // If letters in name still need to be guessed
    else {
        if (isNaN(letterGuessed) && letterGuessed.toLowerCase() === letterGuessed) { // make sure only lowercase letter keys are pressed
            // If letter guessed is in name
            if (artistForGame.includes(letterGuessed)) {
                // Find the index of the letter in the name - find all repetitions of letter --> O(n) - linear traversal of name
                // Use the formula 2*index-1 to find index to insert letter in display
                let index = artistForGame.indexOf(letterGuessed); // the first occurrence of the letter in the name. because this is guaranteed at this point
                do {
                    display.innerHTML.replaceAt(index, letterGuessed);
                    index = artistForGame.indexOf(letterGuessed, index+1); // starting search for next repetiion of guessed letter
                } while (index != -1);
            }
            // If letter guessed isn't in name
            else {
                // If a repeat letter is guessed
                if (lettersGuessedArea.textContent.includes(letterGuessed)) {
                    alert(`"${letterGuessed}" was guessed already. Choose a different letter. (Guesses was not derecemented by 1.)`);
                    return;
                }
                // Add letter guessed to letter-guessed-area
                lettersGuessedArea.textContent += `${letterGuessed}, `;
                // Decrement guesses avaiable by 1
                document.getElementById('guesses-left').innerHTML--;
                let numberOfGuesses = guessesLeftArea.textContent;
                // If ran out of guesses
                if (numberOfGuesses == 0) { // double == rather than triple === because numberOfGuesses is a string
                    // Increment losses by 1
                    document.getElementById('losses').innerHTML++;
                    // Start a new game
                    letterForGame = startNewGame(newSetOfGuesses);
                }
            }
        }
    }
});

// Used to replace the underscore in the display with the correctly guessed letter
function replaceAt(index,letterGuessed) {
    var display = document.getElementById('word').innerHTML;

    var arrayOfDisplay = display.split(" ");
    arrayOfDisplay.splice(index, 1, letterGuessed);
    display.innerHTML = arrayOfDisplay.join(" ");
}
