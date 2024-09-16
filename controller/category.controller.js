const Categorys = require("../models/category.model")




let fetchCategory = async (req, res) => {
    try {

        let category = await Categorys.find();

        res.status(200).json({
            message: "category fetch success",
            category,
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

let createCategory = async (req, res) => {
    try {

        let body = req.body;

        if (!body.categoryname) {
            return res.status(401).json({ message: "category name are required" });
        }
        let findCategory = await Categorys.findOne({ categoryname: body.categoryname })
        if (findCategory) {
            return res.status(401).json({ message: "this category alreay define" });
        }
        let category = await Categorys.create(body)

        res.status(200).json({
            message: "category create success",
            category,
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


let deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;

        let findCategory = await Categorys.findById(id)
        if (!findCategory) {
            return res.status(401).json({ message: "category not found" });
        }

        let category = await Categorys.findByIdAndDelete(id);

        res.status(200).json({
            message: "category delete success",
            category,
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

let updateCategory = async (req, res) => {
    try {

        let { id } = req.params;
        let body = req.body;

        let findCategory = await Categorys.findById(id)
        if (!findCategory) {
            return res.status(401).json({ message: "category not found" });
        }
        body._id = id
        let data = await Categorys.findByIdAndUpdate(id, body);

        res.status(200).json({
            message: "category delete success",
            body,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}







module.exports = { fetchCategory, createCategory, deleteCategory, updateCategory }