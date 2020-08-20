const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type:String,
        required: true
    },
    number:{
        type: Number,
        required:true
    },
    user:{
        type:Schema.ObjectId,
        ref: 'User'
    }
});
const model = mongoose.model('Contact',mySchema);
module.exports=model;
