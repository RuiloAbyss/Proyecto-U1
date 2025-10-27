const { randomUUID } = require('node:crypto')
const bcrypt = require('bcryptjs');

let products = [];

function findAll(){
    return products;
}

function findById(id){
    return products.find((p) => p.id === id) || null;
}

async function addProduct(data){
    const exist = products.find((p) => p.id_producto === id_producto);
    if(exist) return null;
    const product = {
        id: randomUUID(),
        name: data.name,
        brand: data.brand || '',
        category: data.category || '',
        stock: data.stock || 0,
        prize: data.prize || 0,
        description: data.description || '',
        url_image: data.url_image || ''
    };
    products.push(product);
    return product;
}

async function updateProduct(id, data){
    const product = products.find((p) => p.id === id);
    if(!product) return null;
    product.name = name || data.name;
    product.brand = brand || data.brand;
    product.category = category || data.category;
    product.stock = stock || data.stock;
    product.prize = prize || data.prize;
    product.description = description || data.description;
    product.url_image = url_image || data.url_image;

    products.push(product);
    return product;
}

async function deleteProduct(id){
    const index = products.findIndex((p) => p.id === id);
    if(index === -1) return null;
    products.splice(index, 1);
    return true;
}

module.exports = { findAll, findById, addProduct, updateProduct, deleteProduct };