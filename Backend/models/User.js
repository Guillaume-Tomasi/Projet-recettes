const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   pseudo: { type: String, required: true, minlength: 3, maxlength: 30, unique: true, trim: true },
   email: { type: String, required: true, unique: true, validate: [isEmail] },
   password: { type: String, required: true, minlength: 6 },
   createdAt: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);