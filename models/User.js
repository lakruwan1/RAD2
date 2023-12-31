const { default: mongoose } = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
    },

    last_name: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
    },

})

module.export = User = mongoose.model('users', UserSchema);