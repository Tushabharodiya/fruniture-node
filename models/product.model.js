let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    frontimage: {
        type: String,
    },
    backimage: {
        type: String,
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorys"
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    stoke: {
        type: Number,
        default: 1,
    },
    available: {
        type: Boolean,
        default: true,
    },
    public_id: {
        type: [String],
    }
}, { timestamps: true });

let Product = mongoose.model("products", productSchema)


module.exports = Product;

