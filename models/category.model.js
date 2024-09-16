let mongoose = require("mongoose")

let categorySchema = mongoose.Schema({
    categoryname: {
        type: String,
    }
}, { timestamps: true })


let Categorys = mongoose.model("categorys", categorySchema)

module.exports = Categorys;
