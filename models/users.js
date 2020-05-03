const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    admin:{
        type:Boolean,
        default:false
    }
});

UserSchema.plugin(PassportLocalMongoose);

const User = mongoose.model('User',UserSchema);

module.exports = User;