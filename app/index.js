const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
  });

let notes = [
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


app.get('/', (req, res) => {
    res.send('<h1>Inicio de pag</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})


app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})