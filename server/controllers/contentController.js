const Content = require('../models/Content');

exports.createContent = async (req, res) => {
    // logic to create a content
    try{
        const content = await Content.create(req.body);
        res.status(201).json({ content });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getAllContents = async (req, res) => {
    // logic to get all contents
    try{
        const contents = await Content.find();
        res.status(200).json({ contents });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getContentById = async (req, res) => {
    // logic to get a content by its ID
    try{
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ content });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.updateContent = async (req, res) => {
    try {
      const content = await Content.findById(req.params.id).populate('topic');
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      if (content.topic.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized' });
      }
      const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.status(200).json({ content: updatedContent });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  exports.deleteContent = async (req, res) => {
    try {
      const content = await Content.findById(req.params.id).populate('topic');
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      if (content.topic.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized' });
      }
      await Content.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Content deleted' });
    } catch (error) {
      res.status(400).json({ error });
    }
  };