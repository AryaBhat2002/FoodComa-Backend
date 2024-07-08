const { getCartByUserId, clearCartByCartId } = require("../repositories/cartRepository");
const { createNewOrder, getOrderByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository");
const { findUser } = require("../repositories/userRepository");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createOrder(userId, paymentMethod){
    
    const cart = await getCartByUserId(userId);
    const user = await findUser({_id: cart.user});


    if(!cart){
        throw new NotFoundError('Cart');
    }

    if(cart.items.length === 0){
        throw new BadRequestError(["Cart is empty , please add some items to the cart"])
    }

    const orderObject = {}

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartItem => {
        return {product: cartItem.product._id, quantity: cartItem.quantity}
    });
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });

    orderObject.address = user.address;

    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if(!order){
        throw new InternalServerError();
    }

    await clearCartByCartId(userId);

    return order;
}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrderByUserId(userId);
    if(!orders) {
        throw new NotFoundError("Orders");
    }
    return orders;
}

async function getOrderDetailsById(orderId) {
    const order = await getOrderById(orderId);
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;
}

async function updateOrder(orderId, status) {
    const order = await updateOrderStatus(orderId, status);
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
}