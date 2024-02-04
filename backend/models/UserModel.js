const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


// --- SCHEMA --- //
//creating schemas
const Schema = mongoose.Schema;

//creating min date for age verification
let currentDate = new Date();
let year = (currentDate.getFullYear()) - 18;
let month = currentDate.getMonth()+1;
let day = currentDate.getDate();
let minDate = [year, month, day].join('-');

//creating schema for user
const userSchema = new Schema(
    {
        email:          { type: String, required: true, unique: true },
        password:       { type: String, required: true },
        birthDate:      { type: Date,   required: true },
        firstName:      { type: String },
        lastName:       { type: String },
        location:       { type: String },
        profilePhoto:   {type: String, default: '..\\frontend\\public\\uploads\\profile-placeholder-06.png' }
    },
);


// --- REGISTER --- //
//making a static method on User to register them - register method
//apparently you cannot use arrow function '() => {}' when creating a method, only regular function 'function() {}',
//otherwise you cannot use 'this'
userSchema.statics.register = async function(email, password, birthDate) {
    //--- VALIDATING --- ///
    if (!email || !password || !birthDate) {
        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)) {
        throw Error('Please provide a valid e-mail address.');
    }
    //validator default options for password
    //{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, 
    //returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, 
    //pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    if (!validator.isStrongPassword(password)) {
        throw Error('Please provide a password consisting of at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol.')
    }
    //checking if this email exists in the database
    const exist = await this.findOne({ email })
    if (exist) {
        throw Error('E-mail already in use.');
    };
    //making sure the user is above 18
    if (birthDate > minDate) {
        throw Error('You must be at least 18.')
    };
    //hashing password using bcrypt
    //adding additional layer not to hash the same passwords in the same way
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //creating a new user with email, verified age and hashed password
    const user = await this.create({ 
        email: email, 
        password: hash, 
        birthDate: birthDate
    });
    return user 
}

// --- LOGIN --- //
//making a static method on User to login
userSchema.statics.login = async function(email, password) {
    //making sure both email&passwords are provided
    if (!email || !password) {
        throw Error('All fields must be filled.')
    };
    //checking if the user exists in the database
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email')
    };
    //checking password & email - comparing input password with encrypted user password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Invalid login credentials.')
    };
    return user
};


// --- MODEL EXPORT --- //
//creating a model from schema
module.exports = mongoose.model('User', userSchema);