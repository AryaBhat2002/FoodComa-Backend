const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises')

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
            throw{reason: "Not able to create product" ,  statusCode: 500}
   
        }
        
    }

    // 2.Then use the url from cloudinary and other products and other product details to add product in db
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if(!product){
        throw{reason: "Not able to create product" ,  statusCode: 500}
    }

    return product;

}

module.exports = {
    createProduct
}