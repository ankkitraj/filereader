const fs = require('fs');
const path = require('path');

exports.readFile = (req, res) => {
  const filePath = path.join(__dirname, '../data/sample.txt');

  // Reading the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.send(data);
  });
};