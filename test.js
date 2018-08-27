/*

let events = [];
const numOfEvents = 8;

for (let i = 0; i < numOfEvents; i++) {
    const min = 0, max = 24;
    const start = getRandomInteger(0, max - 1);
    const end = getRandomInteger(start + 1, max);
    events.push({start: start * 30, end: end * 30});
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(events);

layOutDay(events);

*/

layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}]);
