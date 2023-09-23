import axios from "axios";
import * as cheerio from 'cheerio';
let url='https://publicholidays.com.bd/2023-dates/'
const matches = [];
async function fetchHTML(url) {
    const response = await axios.get(url)
    return cheerio.load(response.data)
}
export default async function getHoliday() {
    const $ = await fetchHTML(url)
    const pattern = /(\d+)\s+(\w{3})/g;
    let match;
    let string=$('.even td').text()
    let string2 = $('.odd td').text()

    while ((match = pattern.exec(string)) !== null) {
        const number = match[1];
        const word = match[2];
        matches.push({ number, word });
    }
    while ((match = pattern.exec(string2)) !== null) {
        const number = match[1];
        const word = match[2];
        matches.push({ number, word });
    }

    return  matches
}

