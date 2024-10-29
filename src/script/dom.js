
const divImage = document.querySelector('.div-image');
const imageUser = document.querySelector('.image-user');
const nameUser = document.querySelector('.name-text');
const ageUser = document.querySelector('.age-text');
const dateUser = document.querySelector('.date-text');
const emailUser = document.querySelector('.email-text');
const button = document.querySelector('.btn');
const icons = document.querySelectorAll('.icons');
const loader = document.querySelector('.loader');


button.addEventListener('click', async () => {
    nameUser.textContent = '';
    ageUser.textContent = '';
    dateUser.textContent = '';
    emailUser.textContent = '';
    imageUser.classList.add('hidden');

    icons.forEach((icon) => icon.classList.add('hidden'));
    loader.classList.remove('hidden');

    try {
        
        const response = await fetch('http://localhost:3000/gerar-usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            
            const user = result.user; 

            insertUser(user);
        } else {
            console.error("Erro ao gerar usuário:", result.message);
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
    }

    loader.classList.add('hidden');
})

function insertUser(data) {
    const name = `${data.name.first} ${data.name.last}`;
    const imageSrc = data.picture.large;
    const age = data.dob.age;
    const date = new Date(data.dob.date).toLocaleDateString('pt-BR');
    const email = data.email;

    
    icons.forEach((icon) => icon.classList.remove('hidden'));
    imageUser.classList.remove('hidden');
    imageUser.setAttribute("src", imageSrc);
    nameUser.textContent = name;
    ageUser.textContent = `${age} anos`;
    dateUser.textContent = date;
    emailUser.textContent = email;
}