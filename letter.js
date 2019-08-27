function Letter(char) {
    this.char = char;
    this.revealed = false;

    this.toString = function () {
        return this.revealed ? this.char : "_";
    }

    this.guess = function (c) {
        if (this.char === c) {
            this.revealed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;