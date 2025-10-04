const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName : {
        type : String,
        unique : true,
        require : true,
    },
    itemValue : {
        type : String,
        require : true,
    },
});

const itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel