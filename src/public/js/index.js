
const socket = io();
let user;

Swal.fire({
    title: 'Iniciar Sesion',
    text: 'Para acceder al chat debes autentificarte',
    icon: 'success',
        confirmButtonText: 'Aceptar',
        input: 'text',
    inputLabel: 'Ingresa tu nombre',
    inputValidator: (value) => {
            if (!value) {
                return 'Debes ingresar minimo un caracter'
            }
            user= value;
        },
        allowOutsideClick: false,
}).then ((result) => {
    socket.on ('new-user', (data) => {
        Swal.fire({
            title: 'Nuevo usuario conectado',
            text: `${data.user} se ha conectado`,
            toast: true,
            position: 'top-right',  
        });
    });
    socket.emit('new-user', {user:result.value});
    user = result.value;
});

const chatBox = document.getElementById('chatBox');

chatBox.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && e.target.value != '') {
        let message = e.target.value;
        socket.emit('message', {
            user,
            message,
        });
        e.target.value = '';
    }
});

socket.on('message', (data) => {
    let history = document.getElementById('history');
    history.innerHTML += `<div style="display:flex; justify-content:${data.user == user ? 'end' : 'start'}"><p style="background-color:#dcf8c6;width: fit-content;padding: 10px;border-radius: 5px;">${data.user}: ${data.message}</p></div>`;
    // history.innerHTML += `<div class="${data.user == user ? "message-me" : ""}"><p><strong>${data.user}:</strong>${data.message}</p></div>`;
});

socket.on ('history',(data) => {
    let history = document.getElementById('history');
    data.forEach((item) => {
        history.innerHTML += `<div style="display:flex; justify-content:${item.user == user ? 'end' : 'start'}"><p style="background-color:#dcf8c6;">${item.user}: ${item.message}</p></div>`;
        // history.innerHTML += `<div class=${item.user == user ? "message-me" : ""}><p><strong>${item.user}:</strong>${item.message}</p></div>`;
    });
});



socket.on("init.productos", (products) => {
    const rowProducts = document.getElementById("rowProducts");
    rowProducts.innerHTML = " ";
    products.forEach(element => {
        rowProducts.innerHTML += `<div class="card col-3 m-2 border border-4 id="${element.id}"">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${element.title}</h5>
            <img src="${element.thumbnail}" class="card-img-top"></>
            <p class="card-text text-center">${element.description}</p>
            <h3 class="card-text text-center ">$ ${element.price}</h3>
            <p class="card-text text-center ">Stock actual:${element.stock}</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div>
        </div>`
    });
});

socket.on("delete.productos", (id) => {
    const product = document.getElementById(id);
    product.remove();
});

socket.on("create.productos", (element) => {
    const rowProducts = document.getElementById("rowProducts");
    rowProducts.innerHTML = `<div class="card col-3 m-2 border border-4 id="${element.id}"">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${element.title}}</h5>
            <p class="card-text text-center">${element.description}</p>
            <h3 class="card-text text-center ">${element.price}</h3>
            <p class="card-text text-center ">cantidad:${element.stock}</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div>
        </div>`
});
