
import getString from "./stringFromAxios.js";
const matches = [];
export default function getHoliday() {
    const pattern = /(\d+)\s+(\w{3})/g;
    let match;
    while ((match = pattern.exec(getString())) !== null) {
        const number = match[1];
        const word = match[2];
        matches.push({ number, word });
    }

    return  matches
}

