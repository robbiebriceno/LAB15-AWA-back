const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');

const app = express();

// Configuración CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // URL de tu frontend en Vercel
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;