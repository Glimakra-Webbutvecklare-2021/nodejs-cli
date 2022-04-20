#! /usr/bin/env node

import chalk from 'chalk';

const url = "https://quotes.rest/qod";

fetch(url, {
  method: 'get',
  headers: { 'Accept': 'application/json' }, // this api needs this header set for the request
})
.then(res => res.json())
.then(data => {
  const quote = data.contents.quotes[0].quote
  const author = data.contents.quotes[0].author
  const log = chalk.green(`${quote} - ${author}`) // we use chalk to set the color green on successful response
  console.log(log);
}).catch(err => {
  const log = chalk.red(err) // we set the color red here for errors.
  console.log(log);
})
