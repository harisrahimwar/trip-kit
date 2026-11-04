import { useEffect, useState } from "react";

type Holiday = { date: string; localName: string; name: string; global: boolean };

export default function Holidays() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [items, setItems] = useState<Holiday[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    setState("loading");
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/MY`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Holiday[]) => { setItems(data); setState("ok"); })
      .catch((e) => { if (e?.name !== "AbortError") setState("error"); });
    return () => ctrl.abort();
  }, [year]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="panel space-y-4">
      <div className="flex items-center gap-3">
        <button className="btn" onClick={() => setYear(year - 1)} aria-label="Previous year">Prev</button>
        <h3 className="font-display text-xl font-semibold">{year}</h3>
        <button className="btn" onClick={() => setYear(year + 1)} aria-label="Next year">Next</button>
      </div>
      {state === "loading" && <p className="text-ink/60">Loading holidays…</p>}
      {state === "error" && <p className="text-clay">Couldn’t load holidays. Check your connection and try another year.</p>}
      <ul className="divide-y divide-ink/10">
        {items.map((h) => (
          <li key={h.date + h.name} className={`flex items-baseline gap-4 py-2 ${h.date < today ? "opacity-50" : ""}`}>
            <time className="w-28 shrink-0 text-sm tabular-nums">
              {new Date(h.date + "T00:00").toLocaleDateString("en-MY", { weekday: "short", day: "numeric", month: "short" })}
            </time>
            <span className="flex-1">
              {h.name}
              {h.localName !== h.name && <span className="text-ink/60"> ({h.localName})</span>}
            </span>
            {!h.global && <span className="text-xs text-sea">Some states</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
