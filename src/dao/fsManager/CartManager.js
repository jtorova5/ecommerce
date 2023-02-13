
const fs = require("fs");

const writeFile = (path, data) =>
    fs.promises.writeFile(path, JSON.stringify(data));

const readFile = async (path) => {
    const read = await fs.promises.readFile(path, { encoding: 'utf-8' });
    console.log({ read })
    const aux = read ? read : "[]"
    const readParse = JSON.parse(aux);
    return readParse;
};

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    addCart = async () => {
        const carts = await readFile(this.path);
        const id = carts.length
        carts.push({
            id,
            products: []
        })
        await writeFile(this.path, carts);
        return id;
    }

    getCart = async (id) => {
        const carts = await readFile(this.path);
        if (carts[id]) {
            return carts[id];
        }
        throw new Error("Cart not found");
    }

    addProductToCart = async (cid, pid) => {
        const carts = await readFile(this.path);
        if (carts[cid]) {
            const productsIndex = carts[cid].products.findIndex((p) => p.id == pid);
            if (productsIndex !== -1) {
                carts[cid].products[productsIndex].quantity++;
            } else {
                carts[cid].products.push({ id: pid, quantity: 1 });
            }
            await writeFile(this.path, carts);
        } else {
            throw new Error("Cart not found");
        }
    }
}


module.exports = CartManager;