const API_URL = "https://gerador-usuario.vercel.app";

const msg = document.querySelector('.msg');
const containerUser = document.querySelector('.container-user');



document.addEventListener('DOMContentLoaded', async () => {
    
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            const usuarios = await response.json();
            
            if (usuarios.length > 0) {
                usuarios.forEach((user) => insertUser(user));
            } else {
                msg.classList.remove('hidden');
            }

        } catch (error) {
            console.log("Erro na requisição dos usuários", error)
        }

    
    function insertUser(user) {
        const divUser = document.createElement('div');
        divUser.className = 'container-user-data';
    
        const deleteIcon = document.createElement('img');

        const userImage = document.createElement('img');
        const userName = document.createElement('p');
        const userAge = document.createElement('p');
        const userDate = document.createElement('p');
        const userEmail = document.createElement('p');
        
        deleteIcon.classList.add('delete-icon');
        deleteIcon.src = "../assets/delete-icon.svg";
        deleteIcon.alt = "Ícone Excluir";
        deleteIcon.addEventListener('click', () => deleteUser(user._id, divUser));
        

        userImage.classList.add('user-image')
        userImage.src = user.picture;
        userImage.alt  = "Foto de Perfil";
    
        userName.textContent = user.name;
        userAge.textContent = `${user.age} anos`;
        userDate.textContent = user.date;
        userEmail.textContent = user.email;
    
        containerUser.appendChild(divUser);
        divUser.append(userImage, userName, userAge, userDate, userEmail, deleteIcon);
    }

})

function deleteUser(id, divUser) {
    try {
        fetch(`${API_URL}/usuarios/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if (response.ok) {
                divUser.remove();
                updateMessageVisibility();
            }
        })

    } catch (error){
        console.error("Ocorreu um erro ao deletar o usuário", error)
    }
}


function updateMessageVisibility() {
    
    //o span conta como child      
    if (containerUser.children.length === 1) {
        msg.classList.remove('hidden');
    } else {
        msg.classList.add('hidden');
    }
}