'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.set('port', port)
let Factual = require('factual-api');
let factual = new Factual(l4WbDnA1iuX1pLI8cD3l0Kkt2QbI9zG37eUI4QZU, p2MkmzSPXNLNgjPjEZ4y6IlQPwohaCwhi4cdH294);


console.log("factual", factual);
// app.get('/factual/*', (req, res) => {
//   apiKey: "l4WbDnA1iuX1pLI8cD3l0Kkt2QbI9zG37eUI4QZU",
//   apiSecret: "p2MkmzSPXNLNgjPjEZ4y6IlQPwohaCwhi4cdH294"

//   // option 1
//   // let newURL = 'http://api.v3.factual.com/' + req.url + &KEY= + apiKey

//   // request(newURL, (err, data) => {
//   //   res.send(data)
//   // })

//   // option 2
//   factual.get(req.url, (err, data) => {
//     console.log("data", data);
//     res.send(data)
//   })

// })

// app.listen(port, () =>
//   console.log(`Listening on port: ${port}`)
// )


// // cors header?
