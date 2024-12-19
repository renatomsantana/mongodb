const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { MONGO_URI, PORT } = require('./config');

const app = express();

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rotas
app.use('/users', userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicializa o servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const logger = require('./middlewares/logger');
app.use(logger);
