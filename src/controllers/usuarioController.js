import User from '../model/Usuario.js';

class UsuarioController {
    
    static async gerarUsuario() {
        try {
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            const user = data.results[0];
            return user;
        } catch {
            console.error("Erro ao gerar usuário", error);
        }
    }


    static async enviarParaBanco(user) {
        const userData = {
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            date: new Date(user.dob.date).toLocaleDateString('pt-BR'),
            email: user.email,
            picture: user.picture.large,
        };

        try {
            const newUser = new User(userData);
            
            await newUser.save();

        } catch {
            res.status(500).json({ message: "Erro ao enviar usuário para o banco"});
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await User.find();

            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Erro ao listar usuários", error);
            res.status(500).json({ message: "Erro ao listar usuários" });
        }
    }

    static async deletarUsuario(req, res) {
        const userId = req.params.id;
        
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch {
            res.status(500).json({ message: "Erro ao deletar usuário" });
        }
    }
}

export default UsuarioController;
