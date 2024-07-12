const Product = require('../schema/productSchema');
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){

    try{
        const response =await Product.create(productDetails);
        return response;
    } catch(error){
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
    }
}

async function getProductByID(productID){
    try{
        const product = await Product.findById(productID);
        return product;
    } catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}

async function deleteProductByID(productID){
    try{
        const response = await Product.findByIdAndDelete(productID);
        return response;
    } catch(error){
        console.log(error);
        throw new InternalServerError();    }
}

async function getAllProducts(){
    try{
        const products = await Product.find({});
        return products;
    } catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createProduct,
    getProductByID,
    deleteProductByID,
    getAllProducts
}