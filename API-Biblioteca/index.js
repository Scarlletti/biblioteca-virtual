const { config } = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

if(!process.env.MONGO_URI) {
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('Erro ao se conectar ao MongoDB:', err);
    process.exit(1);
});

const LivrosSchema = new mongoose.Schema({
    title: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    status: { type: String, required: true},
})

const Livros = mongoose.model('Livros', LivrosSchema);

app.get('/livros', async (req, res) => {
    const livros = await Livros.find();
    res.status(200).json(livros);
})

app.post('/criarLivros', async (req, res) => {
    try {
        const { title, autor, genero, status } = req.body;
        const livro = new Livros({ title, autor, genero, status });
        await livro.save();
        res.status(201).json({ message: 'Livro criado com sucesso!', livro });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

app.put('/atualizarLivros/:id', async (req, res) => {
    const { id } = req.params;
    const { title, autor, genero, status } = req.body;
    const livro = await Livros.findByIdAndUpdate(id, { title, autor, genero, status }, { new: true });
    res.status(200).json({ message: 'Livro atualizado com sucesso!', livro });
})

app.delete('/deletarLivros/:id', async (req, res) => {
    const { id } = req.params;
    await Livros.findByIdAndDelete(id);
    res.status(200).json({ message: 'Livro deletado com sucesso!' });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});