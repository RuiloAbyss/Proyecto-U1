const { randomUUID } = require('node:crypto')
const bcrypt = require('bcryptjs');

let products = [];

function findById(id){
    return products.find((p) => p.id === id) || null;
}

async function createProduct({
    id_producto, nombre, brand, category, stock, prize, description, url_image 
}){
    const exist = products.find((p) => p.id_producto === id_producto);
    if(exist) return null;
    const product = {
        id: randomUUID(),
        id_producto,
        nombre,
        brand,
        category,
        stock,
        prize,
        description,
        url_image
    };
    products.push(product);
    return product;
}

async function editProduct(id, {
    id_producto, nombre, brand, category, stock, prize, description, url_image 
}){
    const product = products.find((p) => p.id === id);
    if(!product) return null;
    product.id_producto = id_producto || product.id_producto;
    product.nombre = nombre || product.nombre;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.prize = prize || product.prize;
    product.description = description || product.description;
    product.url_image = url_image || product.url_image;
    return product;
}

async function deleteProduct(id){
    const index = products.findIndex((p) => p.id === id);
    if(index === -1) return null;
    products.splice(index, 1);
    return true;
}

module.exports = { findById, createProduct, editProduct, deleteProduct};