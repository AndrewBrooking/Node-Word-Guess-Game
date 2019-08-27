const Letter = require("./letter.js");

function Word(word) {
    this.letters = [];

    for (let c of word) {
        this.letters.push(new Letter(c));
    }

    this.toString = function () {
        let str = "";

        for (let l of this.letters) {
            str += l.toString() + "  ";
        }

        return str.trim();
    }

    this.guess = function (c) {
        let result = false;

        for (let l of this.letters) {
            let changed = l.guess(c);
            result = (result || changed);
        }

        return result;
    }

    this.isSolved = function () {
        let result = true;

        for (let l of this.letters) {
            result = result && l.revealed;
        }

        return result;
    }

    this.reveal = function () {
        for (let l of this.letters) {
            l.revealed = true;
        }
    }
}

module.exports = Word;