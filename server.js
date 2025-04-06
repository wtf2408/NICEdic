// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const wordsFile = path.join(__dirname, 'words.json');

app.use(express.json());
app.use(express.static('public'));

// Load words
app.get('/api/words', (req, res) => {
  fs.readFile(wordsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading words');
    res.json(JSON.parse(data || '[]'));
  });
});

// Save new word
app.post('/api/words', (req, res) => {
  const newWord = req.body;
  fs.readFile(wordsFile, 'utf8', (err, data) => {
    const words = err ? [] : JSON.parse(data || '[]');
    words.push(newWord);
    fs.writeFile(wordsFile, JSON.stringify(words, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.sendStatus(200);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
