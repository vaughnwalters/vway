'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.set('port', port)
let Factual = require('factual-api');
let factual = new Factual(apiKey, apiSecret);


app.get('/factual/*', (req, res) => {
let apiKey = 
let apiSecret= 
  // option 1
  // let newURL = 'http://api.v3.factual.com/' + req.url + &KEY= + apiKey

  // request(newURL, (err, data) => {
  //   res.send(data)
  // })

  // option 2
  factual.get(req.url, (err, data) => {
    res.send(data)
  })

})


app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)


// cors header?
