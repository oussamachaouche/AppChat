const mongoose = require('mongoose');

const msSchema = new mongoose.Schema({
msg:{
    type: String,
    required : true
}

})

const Msg = mongoose.model('msg', msSchema)
module.exports = Msg;