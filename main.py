from random import randint

class Timetable(object):
    def __init__(self, stop_fname, arrivals_fname):
        self.stops = self.load_stops(stop_fname)
        self.arrivals = self.load_arrivals(arrivals_fname)

    def load_stops(self, fname):
        with open(fname) as f:
            return f.read().split("\n")

    def load_arrivals(self, fname):
        arrivals = {}
        stop_count = len(self.stops)
        for s in self.stops:
            arrivals[s] = []
        with open(fname) as f:
            times = f.read().split("\n")
            for i in range(len(times)):
                cur_time = times[i]
                cur_key = self.stops[i % stop_count]
                arrivals[cur_key].append(cur_time)
        for s in self.stops:
            arrivals[s].sort()
        return arrivals

    def get_next_time(self, stop, time):
        arrivals = self.arrivals[stop]
        print(arrivals)
        h_t, s_t = time.split(":")
        for a in arrivals:
            h_a, s_a = a.split(":")
            if h_a == "xx":
                continue
            h_t = int(h_t)
            h_a = int(h_a)
            s_t = int(s_t)
            s_a = int(s_a)
            h_d = (h_a - h_t)
            s_d = s_a - s_t
            m_d = h_d * 60 + s_d
            if m_d >= 0:
                return a

if __name__ == "__main__":
    t = Timetable("stops.txt", "times.txt")
    stop = t.stops[randint(0, 11)]
    time = f'{randint(0, 2)}{randint(0, 9)}:{randint(0, 5)}{randint(0, 9)}'
    print(stop, time)
    print(t.get_next_time(stop, time))