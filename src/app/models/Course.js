const mongoose = require('mongoose')
//dịnh nghĩa schema (tạo ra lược đồ đối tượng)
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Course = new Schema({
    name: { type: String, maxLength: 255, required: true},
    description: { type: String, maxLength: 600},
    image: { type: String, maxLength:255, default: 'https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA'},
    level: { type: String, maxLength:255},
    slug: { type: String, slug: 'name', unique: true},
}, {timestamps: true}); 

//add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Course)