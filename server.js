const express = require('express')
const body_parser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
let db;

app.use(body_parser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://michael:passw0rd@my-favorite-crypto-1ugms.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('my-favorite-crypto')
    app.listen(3000, () => {
        console.log('listening on 3000')
    })

    app.get('/', (req, res) => {
        db.collection('projects').find()
    })
})

app.post('/crypto-projects', (req, res) => {
    db.collection('projects').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    db.collection('projects').find().toArray(function (err, results) {
        console.log(results)
        res.render('index.ejs', {
            projects: results
        })
    })
})



