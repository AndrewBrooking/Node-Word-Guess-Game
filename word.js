const Letter = require("./letter.js");

function Word(word) {
    this.letters = [];

    for (let c of word) {
        this.letters.push(new Letter(c));
    }

    this.getString = function () {
        let str = "";

        for (let l of letters) {
            str += l.getChar();
        }

        return str;
    }

    this.guess = function (c) {
        for (let l of letters) {
            l.guess(c);
        }
    }
}

module.exports = Word;