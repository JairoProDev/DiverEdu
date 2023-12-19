const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    format: { type: String, required: true }, // 'video', 'audio', 'text', etc.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    uploadDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;