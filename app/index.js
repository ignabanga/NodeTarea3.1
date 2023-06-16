const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

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



function obtenerFechaYHoraActual() {
    const fechaHoraActual = new Date();

    const fecha = fechaHoraActual.toLocaleDateString();
    const hora = fechaHoraActual.toLocaleTimeString();

    return `Fecha: ${fecha}, Hora: ${hora}`;
}

/*let totalPeople = persons.length;
let hora = obtenerFechaYHoraActual();
*/
app.get('/', (req, res) => {
    res.send('<h1>Inicio de pag</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

/*app.get('/api/info', (req, res) => {
    res.send(`Hay informacion sobre: ${totalPeople} personas, ${hora}`)

})*/

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

/*app.post('/api/notes', morgan(':date[web] - Request: :body'),(req, res) => {

    const generarId = () => {
        let id = Math.round(Math.random(1) * 10000)
        return id
    }

    const numberId = generarId()
    const person = req.body
    person.id = numberId

    const nameV = person.name
    const personD = persons.filter(person => person.name == nameV)

    if (!person.name.trim() || !person.number.trim()) {
        console.log('Falta nombre o numero')
        return res.status(400).json({ 
            error: 'Falta nombre o numero' 
          })

    } else if (personD.length > 0 ) {
        console.log('Este nombre ya existe')
        return res.status(400).json({ 
            error: 'Este nombre ya existe' 
          })
    } else {
        persons = persons.concat(person)
        res.json(person)
        console.log('Persona registrada con exito')
    }

})
*/

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})