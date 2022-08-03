const http = require('http') //Native module from node.js

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
    }
]


const app = http.createServer((req, res) => { //Create a server. callback function

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(notes))
   
    }
)

const PORT = 3001 
app.listen(PORT) //Listen on port ####
console.log(`Server running at http://localhost:${PORT}/`)

