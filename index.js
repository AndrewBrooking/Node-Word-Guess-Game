// Import inquirer
const inquirer = require("inquirer");

// Import maxlength-input-prompt
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');

// Register maxlength-input-prompt with inquirer
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

// Import fs
const fs = require("fs");

// Import Word constructor
const Word = require("./word.js");

// Create current word variable
let currentWord;

// Create variable to store the amount of remaining guesses
let remGuesses = 0;

// Start the game
newWord();

// Will display the remaining guesses, hidden/revealed letters, and prompt the player to guess a letter
function prompt() {
    // Display remaining guesses
    console.log("\x1b[0m", `Remaining Guesses: ${remGuesses}\n`);

    // Display revealed and hidden letters
    console.log(` ${currentWord.toString()}\n\n`);

    // Prompt player to guess a letter
    inquirer.prompt([
        {
            type: "maxlength-input",
            message: "Guess a letter:",
            maxLength: 1,
            name: "input"
        }
    ]).then(handleInput);
}

// When a player guesses a letter this will display the correct/incorrect message as well
function handleInput(data) {
    // Obtain character entered
    const char = data.input;

    // Check if guess was correct
    const result = currentWord.guess(char);

    // "Clear" screen
    clearScreen()

    // Display correct or incorrect message
    if (result) {
        console.log("\x1b[32m", "CORRECT!\n");
    } else {
        console.log("\x1b[31m", "INCORRECT!\n");
    }

    // Decrease remaining guesses
    remGuesses--;

    // Get solved status
    const solved = currentWord.isSolved();

    // Check if game is over, if not prompt the player to guess again
    if (solved || remGuesses <= 0) {
        winLose(solved);
    } else {
        prompt();
    }
}

// Chooses a word randomly from the word.txt file
function newWord() {
    // Read the words.txt file
    fs.readFile("./words.txt", "utf8", (error, data) => {
        // Check for any errors
        if (error) {
            return console.log(error);
        }

        // Store words from the words.txt file in an array
        let wordList = data.split('\n');
        
        // Set current word
        currentWord = randomWord(wordList);

        remGuesses = currentWord.letters.length + 5;

        // "Clear" screen
        clearScreen();

        // Prompt player to guess a letter
        prompt();
    });
}

// Return a random Word object
function randomWord(wordList) {
    const index = Math.floor(Math.random() * wordList.length);
    const word = wordList[index].trim().toLowerCase();
    return new Word(word);
}

// Check is player wants to play again, if so a new word is selected
function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play again?",
            name: "response",
            default: true
        }
    ]).then(
        (data) => {
            if (data.response) {
                newWord();
            } else {
                console.log("Thanks for playing!");
            }
        }
    );
}

// Handles win/loss messages and asks if the player wants to play again
function winLose(solved) {
    // "Clear" screen
    console.log('\033[2J');

    // Determine if win or loss message should be displayed
    if (remGuesses <= 0 && !solved) {
        console.log("Too bad! You ran out of guesses.");
    } else {
        console.log("Good job! You guessed the word!");
    }

    // Reveal all letters of the current word
    currentWord.reveal();

    // Display the word
    console.log(`The word was ${currentWord.toString().replace(/\s/g, ``)}`);
    console.log(`You had ${remGuesses} guess remaining.\n`)

    // Check if player wants to continue playing or not
    playAgain();
}

// Clears the screen of previous content
function clearScreen() {
    console.log('\033[2J');
}