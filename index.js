const fs = require('fs');

// NOTE: This randint() function is (start: inclusive, end: exclusive)
const randint = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Timetable {
    constructor(stop_fname, arrivals_fname) {
        this.stops = this.load_stops(stop_fname);
        this.arrivals = this.load_arrivals(arrivals_fname);
    }
    load_stops(fname) {
        return fs.readFileSync(fname, { encoding: "utf8"}).split("\n");
    }
    load_arrivals(fname) {
        let arrivals = {};
        const stop_count = this.stops.length;
        this.stops.forEach(s => arrivals[s] = []);
        const times = fs.readFileSync(fname, { encoding: "utf8"}).split("\n");
        times.forEach((t, i) => arrivals[this.stops[i % stop_count]].push(t));
        this.stops.forEach(s => arrivals[s].sort());
        return arrivals;
    }
    get_next_time(stop, time) {
        const arrivals = this.arrivals[stop];
        let [h_t, s_t] = time.split(":");
        h_t = Number(h_t);
        s_t = Number(s_t);
        for (let i=0; i<arrivals.length; i++) {
            const a = arrivals[i];
            let [h_a, s_a] = a.split(":");
            if (h_a == "xx")
                continue;
            h_a = Number(h_a);
            s_a = Number(s_a);
            const h_d = (h_a - h_t);
            const s_d = s_a - s_t;
            const m_d = h_d * 60 + s_d;
            if (m_d >= 0)
                return a;
        }
        return null;
    }
}

const main = () => {
    const t = new Timetable("stops.txt", "times.txt");
    const stop = t.stops[randint(0, 11)];
    const time = `${randint(0, 2)}${randint(0, 9)}:${randint(0, 5)}${randint(0, 9)}`;
    console.log(stop, time);
    console.log(t.get_next_time(stop, time));
}

main();