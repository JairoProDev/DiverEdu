const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;