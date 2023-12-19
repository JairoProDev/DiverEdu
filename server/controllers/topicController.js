const Topic = require('../models/topic');

exports.createTopic = async (req, res) => {
    // logic to create a topic
    try{
        const topic = await Topic.create(req.body);
        res.status(201).json({ topic });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getAllTopics = async (req, res) => {
    // logic to get all topics
    try{
        const topics = await Topic.find();
        res.status(200).json({ topics });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getTopicById = async (req, res) => {
    // logic to get a topic by its ID
    try{
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.status(200).json({ topic });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.updateTopic = async (req, res) => {
    // logic to update a topic
    try{
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
          return res.status(404).json({ message: 'Topic not found' });
        }
        if (topic.user.toString() !== req.user.id) {
          return res.status(403).json({ message: 'User not authorized' });
        }
        const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ updatedTopic });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.deleteTopic = async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      if (topic.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized' });
      }
      await Topic.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Topic deleted' });
    } catch (error) {
      res.status(400).json({ error });
    }
  };