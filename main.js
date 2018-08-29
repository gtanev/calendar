const container = document.getElementById('container');
const eventArea = document.getElementById('event-area');
const dial = document.getElementById('dial');
const marker = document.getElementById('marker');
const timeline = document.getElementById('timeline');

const labelHeight = document.getElementById('container').clientHeight / 24;
const minutes = ['00', '30'];

for (let i = 9; i <= 21; i++) {
    const hour = i > 12 ? i - 12 : i;
    const period = i >= 12 ? 'PM' : 'AM';

    for (let j = 0; j <= 1; j++) {
        if (i === 21 && j === 1) continue;

        let div = document.createElement('div');

        if (j === 0)
            div.innerHTML = `<span>${hour}:${minutes[j]}</span> ${period}`;
        else
            div.innerHTML = `${hour}:${minutes[j]}`;

        div.style.lineHeight = div.style.minHeight = div.style.maxHeight = labelHeight + 'px';

        timeline.appendChild(div);
    }
}

dial.style.marginLeft = marker.style.width = timeline.clientWidth + 'px';
dial.style.width = container.clientWidth - timeline.clientWidth + 'px';

eventArea.style.marginTop = marker.style.marginTop = labelHeight / 2 + 'px';

container.addEventListener('mousemove', (mouseEvent) => {
    dial.style.top = document.documentElement.scrollTop + mouseEvent.clientY - 10 + 'px';

    let eventBox = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);

    if (eventBox.className === 'event') {
        marker.style.top = eventBox.style.top;
        marker.style.height = eventBox.style.height;
    } else {
        marker.style.top = dial.style.top;
        marker.style.height = '0px';
    }
});

container.addEventListener('mouseleave', (_) => {
    dial.style.backgroundColor = 'transparent';
});

container.addEventListener('mouseenter', (_) => {
    dial.style.backgroundColor = 'black';
});
