import axios from "axios";
import * as cheerio from 'cheerio';
let url='https://publicholidays.com.bd/2023-dates/'
import convertDate from "./convertToDate.js";

async function fetchHTML(url) {
    const response = await axios.get(url)
    return cheerio.load(response.data)
}
const $ = await fetchHTML(url)


// Print some specific page content
var weekend=$('.even td').text()
var weekend2=$('.odd td').text()
const listWeekend=weekend+weekend2

console.log(listWeekend)

const pattern = /(\d+)\s+(\w{3})/g;

const matches = [];
let match;
while ((match = pattern.exec(listWeekend)) !== null) {
    const number = match[1];
    const word = match[2];
    matches.push({ number, word });
}
for (let i = 0; i <matches.length; i++) {
    convertDate(parseInt(matches[i]["number"]),matches[i]["word"])

}
