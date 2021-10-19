import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShortenSchema = new Schema({
    url: String,
    slug: String
}, {
    timestamps: true
});

const ShortenUrl = mongoose.model('ShortenUrl', ShortenSchema);

export default ShortenUrl;