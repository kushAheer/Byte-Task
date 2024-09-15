import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;