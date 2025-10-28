const { randomUUID } = require('node:crypto')
const Product = require('./product.model'); // Importar el modelo de producto para obtener detalles

let shoppingCarts = [
    {//REMOVER CUANDO SE IMPLEMENTE EN FIREBASE
        id: randomUUID(), 
        userId: '@sa_j5l0bY8bXUuJ8Fh', // ID del usuario
        products: [
        ]
    }
];

function findAll(){
    return shoppingCarts;
}

function findById(id){
    return shoppingCarts.find((c) => c.id === id) || null;
}

function findByUserId(userId){
    let cart = shoppingCarts.find((c) => c.userId === userId);
    if (!cart) {
        cart = {
            id: randomUUID(),
            userId: userId,
            products: []
        };
        shoppingCarts.push(cart);
    }
    return cart;
}

function addtoCart(userId, productId, quantity = 1){
    const cart = findByUserId(userId);
    const productDetails = Product.findById(productId);

    if (!productDetails) {
        return null; // Producto no encontrado
    }

    const existingItem = cart.products.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.products.push({ product: productDetails, quantity: quantity });
    }
    
    return cart;
}

function removeFromCart(userId, productId) {
    const cart = findByUserId(userId);
    const initialLength = cart.products.length;
    
    cart.products = cart.products.filter(item => item.product.id !== productId);
    return cart.products.length < initialLength;
}

function clearCart(userId) {
    const cart = findByUserId(userId);
    cart.products = [];
    return cart;
}

module.exports = { findAll, findById, findByUserId, addtoCart, removeFromCart, clearCart };