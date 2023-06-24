const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })

/*let notes = [
        {
          "id": 1,
          "content": "HTML is easy",
          "important": true
        },
        {
          "id": 2,
          "content": "Browser can execute only JavaScript",
          "important": false
        },
        {
          "id": 3,
          "content": "GET and POST are the most important methods of HTTP protocol",
          "important": true
        },
        {
          "content": "asdasdasdasdasd",
          "important": true,
          "id": 4
        },
        {
          "content": "Nueva nota",
          "important": true,
          "id": 5
        },
        {
          "content": "Nueva nota",
          "important": true,
          "id": 6
        },
        {
          "content": "Otra nueva nota",
          "important": true,
          "id": 7
        },
        {
          "content": "Nueva prueba",
          "important": false,
          "id": 8
        },
        {
          "content": "notessss",
          "important": false,
          "id": 9
        },
        {
          "content": "Nueva nota",
          "important": true,
          "id": 10
        }
      ]
*/

app.get('/', (req, res) => {
    res.send('<h1>Inicio de pag</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
