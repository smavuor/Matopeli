/**
*require Express, bodyParser, cors and Detail from databaseConnection-folder
*/

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Detail = require('./databaseConnection/Detail')

app.use(cors())

app.use(bodyParser.json())


var namesAndScores = []

/**
*HTTP get-request from route /namesAndScores. Formats the data in formatDetail-method
*/
app.get('/namesAndScores', (request, response) => {
Detail
  .find({})
  .then(details => {
    response.json(details.map(formatDetail))
  })
})
/**
*HTTP get-request according to REST-api. Gets the individual usernames and scores.
*/
app.get('/namesAndScores/:id', (request, response) => {
  Detail
    .findById(request.params.id)
    .then(detail => {
      response.json(detail)
    })
})
/**
*Make id for the names and scores. Gets the current biggest id
*@return {int} - Current biggest id + 1
*/
var makeId = () => {
  var maxId = namesAndScores.length > 0 ? namesAndScores.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
  return maxId + 1
}

/**
*HTTP post-request to /namesAndScores. Sends the username and score.
*/
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
/**
*@description Formats the detail.
*@param {object} - Formats name, score and id.
*/
function formatDetail(detail){
  return {
    name: detail.name,
    score: detail.score,
    id: detail._id
  }
}
  /**
  *PORT - the port number, which acts as a local server.
  */
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
