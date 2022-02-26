const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const routes = require('./routers/index.router.js')

const PORT = process.env.PORT || 3000

const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({
//   origin: "http://localhost:3000"
// }))
app.use(cors())
// Router
app.use('/api', routes);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
