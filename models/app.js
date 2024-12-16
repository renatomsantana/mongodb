const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mongoose_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
// Criar um usuário
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar um usuário por ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um usuário
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar um usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicializa o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
