const Product = require("../models/product.model");
let cloudinary = require("../middaleware/cloudinary.config");



let fetchProduct = async (req, res) => {
    try {
        let product = await Product.find().populate("category","categoryname");
        res.status(200).json({
            message: "product featch success",
            product,
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


let addProduct = async (req, res) => {
    try {
        let body = req.body;
        let frontimage = await cloudinary.uploader.upload(req.files['frontimage'][0].path)
        let backimage = await cloudinary.uploader.upload(req.files['backimage'][0].path)

        let findProduct = await Product.findOne({ title: body.title })
        if (findProduct) {
            return res.status(401).json({ message: "this product alredy here" })
        }

        if (!body.title || !body.price || !body.category) {
            return res.status(401).json({ message: "all fileds reqiured" })
        }

        let product = await Product.create({
            ...body,
            frontimage: frontimage.secure_url,
            backimage: backimage.secure_url,
            public_id: [frontimage.public_id, backimage.public_id]
        })

        res.status(200).json({
            message: "product add success",
            product,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


let deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let findProduct = await Product.findById(id)
        console.log(findProduct);

        if (!findProduct) {
            return res.status(401).json({ message: "product not found ! " })
        }

        for (let public_id of findProduct.public_id) {
            await cloudinary.uploader.destroy(public_id);
        }

        let product = await Product.findByIdAndDelete(id)
        res.status(200).json({
            message: "product delete success",
            product,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



let updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        // console.log(id, body);


        if (req.files) {
            let old = await Product.findById(id)
            for (let public_id of old.public_id) {
                await cloudinary.uploader.destroy(public_id);
            }

            let frontimage = await cloudinary.uploader.upload(req.files['frontimage'][0].path)
            let backimage = await cloudinary.uploader.upload(req.files['backimage'][0].path)

            let newBody = {
                frontimage: frontimage.secure_url,
                backimage: backimage.secure_url,
                ...body,
                public_id: [frontimage.public_id, backimage.public_id]
            }

            let product = await Product.findByIdAndUpdate(id, newBody)
            // console.log(product);
            res.status(200).json({
                message: "Product successfully update",
                newBody,
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { fetchProduct, addProduct, deleteProduct, updateProduct }