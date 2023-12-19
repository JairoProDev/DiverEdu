const User = require('../models/user');

exports.createUser = async (req, res) => {
    // lógica para crear un usuario
    try{
        const user = await User.create(req.body);
        res.status(201).json({ user });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getAllUsers = async (req, res) => {
    // lógica para obtener todos los usuarios
    try{
        const users = await User.find();
        res.status(200).json({ users });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.getUserById = async (req, res) => {
    // lógica para obtener un usuario por su ID
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.updateUser = async (req, res) => {
    // lógica para actualizar un usuario
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ user });
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.deleteUser = async (req, res) => {
    // lógica para eliminar un usuario
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json();
    }
    catch(error){
        res.status(400).json({ error });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error });
    }
};