function layOutDay(events) {
    events = events.map(objectToEvent);
    arrangeEvents(events);
    renderEvents(events);
}

class Event {
    constructor(start, end) {
        Event.validateArguments(start, end);
        this.start = start;
        this.end = end;
    }

    withDescription(description = 'Sample Item') {
        this.description = description;
        return this;
    }

    withLocation(location = 'Sample Location') {
        this.location = location;
        return this;
    }

    overlapsWith(otherEvent) {
        return this.end > otherEvent.start && this.start < otherEvent.end;
    }

    static comparePrecedence(e1, e2) {
        return e1.start === e2.start ? e1.end - e2.end : e1.start - e2.start;
    }

    static validateArguments(start, end) {
        if (!Number.isInteger(start) || !Number.isInteger(end))
            throw new Error('`start` and `end` parameters must be valid integers');
        if (end <= start)
            throw new Error('`end` parameter must be larger than `start` parameter');
    }
}

const objectToEvent = (object) => {
    return new Event(object.start, object.end)
        .withDescription(object.description)
        .withLocation(object.location);
};

const arrangeEvents = (events) => {
    if (!events.length) return;

    events.sort(Event.comparePrecedence);

    let groups = [];
    let lastEnd = 0;

    for (let i = 0; i < events.length; i++) {
        let group = groups.find(g => !g[g.length - 1].overlapsWith(events[i]));
        group ? group.push(events[i]) : groups.push(new Array(events[i]));

        lastEnd = Math.max(events[i].end, lastEnd);

        if (i === events.length - 1 || events[i + 1].start >= lastEnd) {
            positionEvents(groups);
            groups.length = 0;
            lastEnd = 0;
        }
    }
};

const positionEvents = (groups) => {
    for (let i = 0; i < groups.length; i++) {
        for (let event of groups[i]) {
            event.position = i / groups.length;
            event.span = getOffset(event, groups.slice(i + 1)) / groups.length;
        }
    }
};

const getOffset = (event, groups) => {
    let offset = 1;

    for (let group of groups) {
        if (group.some(e => e.overlapsWith(event)))
            break;
        offset++;
    }

    return offset;
};

const renderEvents = (events) => {
    Array.from(document.querySelectorAll('.event')).forEach(e => e.remove());

    const availableWidth = document.getElementById('event-area').clientWidth;

    for (let event of events) {
        const div = document.createElement('div');

        div.className = 'event';

        div.style.top = `${event.start}px`;
        div.style.height = `${event.end - event.start}px`;
        div.style.left = `${availableWidth * event.position}px`;
        div.style.width = `${availableWidth * event.span}px`;

        div.innerHTML = `<strong>${event.description}</strong>${event.location}`;

        document.getElementById('event-area').appendChild(div);
    }
};