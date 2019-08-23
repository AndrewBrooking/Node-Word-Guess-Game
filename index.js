// Import inquirer
const inquirer = require("inquirer");

// Import fs
const fs = require("fs");

// Import Word constructor
const Word = require("./word.js");

// Create current word variable
let currentWord;

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
    });
}

// Return a random Word object
function randomWord(wordList) {
    const index = Math.floor(Math.random() * wordList.length);
    const word = wordList[index];
    return new Word(word);
}