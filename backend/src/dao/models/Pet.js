import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specie: {
        type: String,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    adopted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    image: {
        type: String,
        default: null
    },
    breed: {
        type: String,
        trim: true,
        default: null
    },
    location: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('Pet', petSchema);
