const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey'; // Troque para uma variável de ambiente no futuro

// Registro de um novo usuário
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    next(error);
  }
};

// Login do usuário
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
