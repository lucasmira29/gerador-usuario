import 'dotenv/config';
import express from 'express';
import db from './src/config/dbConnect.js';
import cors from 'cors';
import UsuarioController from './src/controllers/usuarioController.js';


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota para salvar o usuário
app.post('/gerar-usuarios', async (req, res) => {
    
    try {
        const user = await UsuarioController.gerarUsuario();
        await UsuarioController.enviarParaBanco(user);
        
        res.status(201).json({ user });
    } catch (erro) {
        console.error("Ocorreu um erro: ", erro);
    }
});

app.get('/usuarios', UsuarioController.listarUsuarios);

app.delete('/usuarios/:id', UsuarioController.deletarUsuario);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});