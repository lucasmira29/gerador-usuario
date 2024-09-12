const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/usuarios');

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    date: String,
    email: String,
    picture: String
});

const User = mongoose.model('User', UserSchema);

// Rota para salvar o usuário
app.post('/api/usuarios', async (req, res) => {
    const { name, age, date, email, picture } = req.body;
    
    try {
        const newUser = new User({ name, age, date, email, picture });
        await newUser.save();
        res.status(201).json({ message: "Usuário salvo com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar usuário", error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});