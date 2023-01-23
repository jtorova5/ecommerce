const socket = io();

socket.on("init.products", (products) => {
  console.log(products);
  const rowProducts = document.getElementById("rowProducts");
  rowProducts.innerHTML = " ";
  products.forEach((element) => {
    rowProducts.innerHTML += `<div id=${parseInt(
      element.id
    )} class="card col-3 m-2 border border-4">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${element.title} (${
      element.id
    })</h5>
            <img src="${element.thumbnail}" class="card-img-top"></>
            <p class="card-text text-center">${element.description}</p>
            <h3 class="card-text text-center ">$ ${element.price}</h3>
            <p class="card-text text-center ">Stock actual:${element.stock}</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary">Comprar</button>
            </div>
        </div>
        </div>`;
  });
});

socket.on("delete.products", (id) => {
  console.log(id.id);
  const product = document.getElementById(id.id);
  product.remove();
});

socket.on("create.products", (element) => {
  console.log(element);
  const rowProducts = document.getElementById("rowProducts");
  rowProducts.innerHTML = `<div id=${parseInt(
    element.id
  )} class="card col-3 m-2 border border-4">
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
        </div>`;
});
