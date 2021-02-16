const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

// match the hash password with the user entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


//Before save encrypt a password
//register a new user
UserSchema.pre('save', async function(next) {
    //If want to update the name email not password then we dont want to run hash password because it does then it creates new hash password then we not able to login 
    //If password is nott modified then move next
    if (!this.isModified('password')) {
        next()
    }
    //If password is modified then run this..
    //generate a salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', UserSchema);

module.exports = User;