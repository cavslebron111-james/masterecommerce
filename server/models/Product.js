const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
    write:{
        type:Schema.Types.ObjectId,
        ref:'User1',
        required:true
    },
    title:{
        type:String,
        maxLength:50
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        Default:[]
    },
    continents:{
        type:Number,
        default:1
    },
    sold:{
        type:Number,
        default:0,
        maxLength:100
    },
    views:{
        type:Number,
        default:0
    },
    
},{timestamps:true})





productSchema.index({
    title:'text',
    description:'text',
}
,{
    weights:{
        Title:5,
        description:1,
    }
}
)
const Product = mongoose.model('Product', productSchema);

module.exports = {Product }