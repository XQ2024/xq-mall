const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectID = Schema.Types.ObjectId;


const cartSchema = new Schema({
    owner: {
        type: ObjectID,
        ref: 'User',
        required: true
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Item',
            required: true
        },
        name: String,
        price: Number,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    taxRate: {
        type: Number,
        required: true,
        default: 0.08
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Cart', cartSchema);