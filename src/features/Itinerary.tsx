import { useState, type FormEvent } from "react";
import { useLocalStorage, uid } from "../lib/useLocalStorage";

type Stop = { id: string; date: string; time: string; title: string; place: string };

export default function Itinerary() {
  const [stops, setStops] = useLocalStorage<Stop[]>("tk-itinerary", []);
  const [form, setForm] = useState({ date: "", time: "", title: "", place: "" });

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.title.trim()) return;
    setStops([...stops, { id: uid(), ...form, title: form.title.trim() }]);
    setForm({ ...form, time: "", title: "", place: "" });
  };

  const days = [...new Set(stops.map((s) => s.date))].sort();

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="panel grid gap-3 sm:grid-cols-[9rem_7rem_1fr_1fr_auto]">
        <input type="date" required className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label="Date" />
        <input type="time" className="field" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} aria-label="Time" />
        <input className="field" placeholder="What are you doing?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} aria-label="Activity" />
        <input className="field" placeholder="Where?" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} aria-label="Place" />
        <button className="btn">Add stop</button>
      </form>

      {days.length === 0 && <p className="text-ink/60">No stops yet. Pick a date and add your first activity.</p>}

      {days.map((d, i) => (
        <section key={d} className="panel">
          <h3 className="font-display text-lg font-semibold">
            Day {i + 1} · {new Date(d + "T00:00").toLocaleDateString("en-MY", { weekday: "long", day: "numeric", month: "short" })}
          </h3>
          <ul className="mt-3 divide-y divide-ink/10">
            {stops
              .filter((s) => s.date === d)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((s) => (
                <li key={s.id} className="flex items-baseline gap-4 py-2">
                  <span className="w-14 shrink-0 text-sm tabular-nums text-ink/60">{s.time || "Any"}</span>
                  <span className="flex-1">
                    {s.title}
                    {s.place && <span className="text-ink/60"> at {s.place}</span>}
                  </span>
                  <button className="btn-quiet" onClick={() => setStops(stops.filter((x) => x.id !== s.id))}>Remove</button>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
