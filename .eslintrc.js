/* eslint-disable */
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "warn",
        "no-trailing-spaces": "warn"
    },
    "globals": {
        "expect": true,
        "sinon": true,
    }
};
