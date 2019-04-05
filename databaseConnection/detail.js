const mongoose = require('mongoose')

const url = 'mongodb+srv://TaysiPino:secretPassword@fullstack-wmubg.mongodb.net/SnakeGame'

mongoose.connect(url)

const Detail = mongoose.model('Detail', {
  name: String,
  score: Number
})
module.exports = Detail
