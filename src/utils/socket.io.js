const ProductManager = require("../dao/fsManager/ProductManager");
const ChatsManager = require('../dao/mongoManager/dbChatsManager')
const Product = new ProductManager('./assets/product.json');
const Chat = new ChatsManager();

const {Server} = require('socket.io');
let io;

const connectionSocket = (httpServer)=>{
  io = new Server(httpServer);
  io.on ('connection', async (socket)=>{
      console.log("New client connected")
      const products = await Product.getProducts();
      const Chats  = await Chat.getMessage();
      socket.emit('init-products', products)
      socket.emit('init-chats', Chats)
  });
}

const emitDeleteProduct = (id)=>{
  io.emit('delete-product', {id})
}

const emitAddRealtime = (add)=>{
  io.emit('add-product',{add} )
}

const emitMessage = (newMessage)=>{
 console.log(`New message sent: ${JSON.stringify(newMessage)}`)
 io.emit('add-message', newMessage )
} 

const emitDeleteMs = (message)=>{
 console.log(`Menssage deleted: ${JSON.stringify(message)}`)
 io.emit('delete-message', message)
}

module.exports = {connectionSocket, emitDeleteProduct, emitAddRealtime, emitMessage, emitDeleteMs};
