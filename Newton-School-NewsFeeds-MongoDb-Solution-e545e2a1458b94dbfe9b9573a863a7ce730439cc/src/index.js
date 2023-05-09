const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { newsArticleModel } = require('./connector')

console.log('started the server')


app.get('/newFeeds', async (req, res) => {
    let limit = req.query.limit*1 || 10;
    let offset = req.query.offset*1 || 0;
    const data = await newsArticleModel.find({}).skip(limit*offset).limit(limit);
    res.send(data);
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;