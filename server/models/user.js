const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'student' }, // 'student', 'teacher', 'admin'
    registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
    createdQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    completedQuizAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAttempt' }],
    createdQuizAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAttempt' }],
    createdQuizQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' }],
    completedQuizQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' }],
    createdQuizAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAnswer' }],
    completedQuizAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAnswer' }],
    createdQuizQuestionAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestionAnswer' }],
    completedQuizQuestionAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestionAnswer' }],
    createdQuizQuestionAnswerAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestionAnswerAttempt' }],
    completedQuizQuestionAnswerAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestionAnswerAttempt' }],
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
      }]
});

const User = mongoose.model('User', UserSchema);

const bcrypt = require('bcryptjs');

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const jwt = require('jsonwebtoken');

UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, 'secret');
    return token;
};

module.exports = User;