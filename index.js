const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Detail = require('./databaseConnection/Detail')

app.use(cors())

app.use(bodyParser.json())


var namesAndScores = []

app.get('/namesAndScores', (request, response) => {
Detail
  .find({})
  .then(details => {
    response.json(details.map(formatDetail))
  })
})
app.get('/namesAndScores/:id', (request, response) => {
  Detail
    .findById(request.params.id)
    .then(detail => {
      response.json(detail)
    })
})

var makeId = () => {
  var maxId = namesAndScores.length > 0 ? namesAndScores.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
  return maxId + 1
}

app.post('/namesAndScores', (request, response) => {
  var body = request.body

  if(body.name === undefined || body.score === undefined){
    return response.status(400).json({ error: 'Tietoja puuttuu'})
  }
  var nameAndScore = new Detail({
    name: body.name,
    score: body.score,
    id: makeId()
  })

  nameAndScore
    .save()
    .then(savedDetail => {
      response.json(savedDetail)
    })
})
function formatDetail(detail){
  return {
    name: detail.name,
    score: detail.score,
    id: detail._id
  }
}



  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
