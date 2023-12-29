const { model } = require("mongoose");

class ExpressError extends Error {
    constructor (status, message) {
        this.status = status;
        this.message = message;
    }
}
model.exports = ExpressError;

