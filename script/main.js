const divImage = document.querySelector('.div-image');
const imageUser = document.querySelector('.image-user');
const nameUser = document.querySelector('.name-text');
const ageUser = document.querySelector('.age-text');
const dateUser = document.querySelector('.date-text');
const emailUser = document.querySelector('.email-text');
const button = document.querySelector('.btn');
const icons = document.querySelectorAll('.icons');
const loader = document.querySelector('.loader');



async function gerarUsuario() {
    fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
        loader.classList.add('hidden');
        const user = data.results[0];
        insert(user);
        enviarParaBanco(user);
    })
    
}


async function enviarParaBanco(user) {
    const userData = {
        name: `${user.name.first} ${user.name.last}`,
        age: user.dob.age,
        date:  new Date(user.dob.date).toLocaleDateString('pt-BR'),
        email: user.email,
        picture: user.picture.large,
    };

    try {
        const response = await fetch('http://localhost:3000/api/usuarios',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const result = await response.json();
        console.log(result);
    
    } catch (error) {
        console.error("Erro ao enviar usuário para o banco", error);
    }
}

button.addEventListener('click', () => {
    nameUser.textContent = '';
    ageUser.textContent = '';
    dateUser.textContent = '';
    emailUser.textContent = '';
    imageUser.classList.add('hidden');

    icons.forEach((icon) => icon.classList.add('hidden'));
    loader.classList.remove('hidden');

    gerarUsuario();
})


function insert(data)  {
    const name = `${data.name.first} ${data.name.last}`;
    const imageSrc = data.picture.large;
    const age = data.dob.age;
    const date = new Date(data.dob.date).toLocaleDateString('pt-BR');
    const email = data.email;

    icons.forEach((icon) => icon.classList.remove('hidden'));
    imageUser.classList.remove('hidden')
    imageUser.setAttribute("src", imageSrc);
    nameUser.textContent = name;
    ageUser.textContent = `${age} anos`;
    dateUser.textContent = date;
    emailUser.textContent = email;
}