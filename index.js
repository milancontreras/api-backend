//  const http = require('http') //Native module from node.js
const express = require('express')//    Third party module. express is a web framwork
const cors = require('cors')//  Third party module. cors is a middleware

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('-----------------')
  next()
})

let notes = [
  {
    id: 1,
    title: 'Note 1',
    body: 'This is note 1',
    date: '2020-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Note 2',
    body: 'This is note 2',
    date: '2020-01-01T00:00:00.000Z'
  },
  {
    id: 3,
    title: 'Note 3',
    body: 'This is note 3',
    date: '2020-01-01T00:00:00.000Z'
  },
  {
    id: 4,
    title: 'Note 4',
    body: 'This is note 4',
    date: '2020-01-01T00:00:00.000Z'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!<h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => { // show
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => { // delete
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes/', (req, res) => { // craete
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxid = Math.max(...ids)

  const newNote = {
    id: maxid + 1,
    title: note.title,
    body: note.body,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  // console.log(newNote)
  res.status(201).json(newNote)
})

app.post('/api/notes/:id', (req, res) => { // update
  const note = req.body
  const id = Number(req.params.id)
  const noteToUpdate = notes.find(note => note.id === id)
  if (!noteToUpdate) {
    return res.status(404).end()
  } else if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  } else {
    noteToUpdate.title = note.title
    noteToUpdate.body = note.body
    noteToUpdate.date = new Date().toISOString()
    res.json(noteToUpdate)
  }
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { // async function
  console.log(`Server is running on port ${PORT}`)
})
