// Create new game settings
function startNewGame(newSetOfGuesses) {
    // Clear letters guessed
    // Reset guesses to starting number of guesses
    // Choose new Artist name from storage
    // Display the Artist name with blanks instead of letters
        // Add the string `_ ` n number of times with the ends trimmed --> n is the length of the name
    
}

/* Going to be used to add guessed letters to this area */
var lettersGuessedArea = document.getElementById('letters-guessed');

var guessesLeftArea = document.getElementById('guesses-left');
var newSetOfGuesses = guessesLeftArea.innerHTML;

// Start the first game

// When Player guesses letter in Artist's name i.e. pressing a key
document.addEventListener('keydown', (event) => {
    console.log("letter pressed: " + event.key);
    let letterGuessed = event.key;
    // If name fully guessed
    if (letterGuessed === letterForGame) {
        // YOU WON!
        document.getElementById('wins').innerHTML++;
        // Reset the game 
        letterForGame = startNewGame(newSetOfGuesses);
    }
    // If letters in name still need to be guessed
    else {
        if (isNaN(letterGuessed) && letterGuessed.toLowerCase() === letterGuessed) { // make sure only lowercase letter keys are pressed
            // If letter guessed is in name
                // Find the index the letter is in in the name - find all repetitions of letter
                // Use the formula 2*index-1 to find index to insert letter in display
            // If letter guessed isn't in name
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
});
