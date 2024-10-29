import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    date: String,
    email: String,
    picture: String
});

const User = mongoose.model('User', UserSchema);

export default User;