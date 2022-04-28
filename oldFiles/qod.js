import chalk from 'chalk';
import fetch from 'node-fetch';

// const response = await fetch('https://github.com/');
// const body = await response.text();

// console.log(body);
// is the same as above
// fetch('https://github.com/').then(response => response.text).then(body => console.log(body));

const url = "https://quotes.rest/qod";

const response = await fetch(url);
const data = await response.json();

const quoteText = data.contents.quotes[0].quote;
const author = data.contents.quotes[0].author;

console.log(quoteText);
console.log('-', chalk.cyan(author));