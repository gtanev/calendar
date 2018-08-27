const container = document.getElementById('container');
const eventArea = document.getElementById('event-area');
const dial = document.getElementById('dial');
const marker = document.getElementById('marker');

const labelHeight = document.getElementById('container').clientHeight / 24;
const minuteMarkings = [':00', ':30'];

for (let i = 9; i <= 21; i++) {
    const hour = i > 12 ? i - 12 : i;
    const period = i >= 12 ? 'PM' : 'AM';

    for (let j = 0; j <= 1; j++) {
        if (i === 21 && j === 1) continue;

        let div = document.createElement('div');

        if (j === 0)
            div.innerHTML = `<span>` + hour + minuteMarkings[j] + `</span>` + ' ' + period;
        else
            div.innerHTML = hour + minuteMarkings[j];

        div.style.minHeight = labelHeight + 'px';
        div.style.maxHeight = labelHeight + 'px';
        div.style.lineHeight = labelHeight + 'px';

        document.getElementById('timeline').appendChild(div);
    }
}

dial.style.width = document.getElementById('container').clientWidth + 'px';
marker.style.width = document.getElementById('timeline').clientWidth + 'px';

eventArea.style.marginTop = labelHeight / 2 + 'px';
marker.style.marginTop = labelHeight / 2 + 'px';

container.addEventListener('mousemove', (mouseEvent) => {
    dial.style.top = document.documentElement.scrollTop + mouseEvent.clientY - 10 + 'px';

    let eventBox = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);

    marker.style.top = eventBox.style.top;
    marker.style.height = eventBox.style.height;
});

container.addEventListener('mouseleave', (_) => {
    dial.style.backgroundColor = 'transparent';
});

container.addEventListener('mouseenter', (_) => {
    dial.style.backgroundColor = 'var(--main-accent-color)';
});
