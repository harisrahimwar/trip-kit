import { useState } from "react";
import { useLocalStorage } from "./lib/useLocalStorage";
import Itinerary from "./features/Itinerary";
import Todos from "./features/Todos";
import Holidays from "./features/Holidays";
import Currency from "./features/Currency";
import Outfits from "./features/Outfits";

const TABS = ["Itinerary", "To-do", "Holidays", "Currency", "Outfits"] as const;
type Tab = (typeof TABS)[number];
const SWATCHES = ["#e8a317", "#1f7a74", "#c8553d", "#6d5bd0"];

type Settings = { trip: string; accent: string; home: string };

export default function App() {
  const [tab, setTab] = useState<Tab>("Itinerary");
  const [open, setOpen] = useState(false);
  const [s, setS] = useLocalStorage<Settings>("tk-settings", { trip: "My trip", accent: SWATCHES[0], home: "MYR" });

  return (
    <div style={{ "--accent": s.accent } as React.CSSProperties} className="mx-auto max-w-3xl px-4 pb-16">
      <header className="flex items-end justify-between gap-4 pt-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">{s.trip}</h1>
        <button className="btn-quiet" onClick={() => setOpen(!open)} aria-expanded={open}>Customize</button>
      </header>
      <div className="mt-2 h-1.5 w-24 rounded-full bg-(--accent)" />

      {open && (
        <div className="panel mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">Trip name
            <input className="field mt-1" value={s.trip} onChange={(e) => setS({ ...s, trip: e.target.value })} />
          </label>
          <label className="text-sm">Home currency
            <input className="field mt-1" maxLength={3} value={s.home} onChange={(e) => setS({ ...s, home: e.target.value.toUpperCase() })} />
          </label>
          <fieldset className="text-sm">
            <legend>Accent colour</legend>
            <div className="mt-2 flex gap-2">
              {SWATCHES.map((c) => (
                <button key={c} aria-label={c} onClick={() => setS({ ...s, accent: c })} style={{ background: c }}
                  className={`size-8 rounded-full ${s.accent === c ? "ring-2 ring-ink ring-offset-2" : ""}`} />
              ))}
            </div>
          </fieldset>
        </div>
      )}

      <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-ink/15" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-semibold ${tab === t ? "border-(--accent) text-ink" : "border-transparent text-ink/50 hover:text-ink"}`}>
            {t}
          </button>
        ))}
      </nav>

      <main className="mt-6">
        {tab === "Itinerary" && <Itinerary />}
        {tab === "To-do" && <Todos />}
        {tab === "Holidays" && <Holidays />}
        {tab === "Currency" && <Currency key={s.home} home={s.home.length === 3 ? s.home : "MYR"} />}
        {tab === "Outfits" && <Outfits />}
      </main>
    </div>
  );
}
