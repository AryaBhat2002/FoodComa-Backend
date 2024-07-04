const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){
    // 1. We should check if an image is coming to create the product, then we should first upload it on cloudinary

    const imagePath = productDetails.imagePath;
    if(imagePath){
        try {
            const cloudinaryReponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryReponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();   
        }
        
    }

    // 2.Then use the url from cloudinary and other products and other product details to add product in db
        const product = await productRepository.createProduct({
            ...productDetails,
            productImage: productImage
        });

        return product;

}

async function getProductByID(productID){
    const response = await productRepository.getProductByID(productID);
    if(!response){
        throw new NotFoundError('Product');
    }

    return response;
}

async function deleteProductByID(productID){
    const response = await productRepository.deleteProductByID(productID);
    if(!response){
        throw new NotFoundError('Product');
    }

    return response;
}

module.exports = {
    createProduct,
    getProductByID,
    deleteProductByID
}