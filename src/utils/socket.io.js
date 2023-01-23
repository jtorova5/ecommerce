const ProductManager = require("../ProductManager");
const Product = new ProductManager("./src/assets/product.json");
const { Server } = require("socket.io");
let io;

const connectionSocket = (httpServer) => {
  io = new Server(httpServer);
  io.on("connection", async (socket) => {
    console.log("New client connected");
    let products = await Product.getProducts();
    socket.emit("init.products", products);
  });
};

const emitDeleteProduct = (id) => {
  console.log("Product deleted");
  io.emit("delete.products", { id });
};

const emitaddRealtime = (add) => {
  console.log("Product created");
  io.emit("create.products", { add });
};

module.exports = { connectionSocket, emitDeleteProduct, emitaddRealtime };
