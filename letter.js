function Letter(char) {
    this.char = char;
    this.guessed = false;

    this.getChar = function () {
        if (this.guessed) {
            return this.char;
        }
        return "_";
    }

    this.guess = function (c) {
        this.guessed = this.char === c;
    }
}

module.exports = Letter;