const http = require('http');
const port = 5000;
const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

app.use(express.static(path.join(__dirname, 'public')));

router.get('/future-js', (req, res) => {
    let doc = nlp(req.query.sentence);
    doc.sentences().toFutureTense();
    const text = doc.text();    
    res.json({ text });
});

app.use('/', router);

http.createServer(app).listen(port, () => {
    console.log(`Listening on port ${port}...`);
});