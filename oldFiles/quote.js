import fs from 'fs';

// Read file Async
// const quotesDB = fs.readFile('./db.json', 'utf8', (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     }
//     console.log("hello", data);
// });

// Read file sync
const quotesDB = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
console.log('begining', quotesDB);
// Select random quote
const randomIdx = Math.floor(quotesDB.length * Math.random()); 
const randomSelected = quotesDB[randomIdx];

console.log(randomSelected);

// Insert new quote via nodejs

const newQuote = {
    quote: "This is coming from nodejs",
    author: "Henry via nodejs"
};

quotesDB.push(newQuote);

console.log('after', quotesDB);
// Write to db.json to make quote persistent
fs.writeFileSync('./db.json', JSON.stringify(quotesDB));

