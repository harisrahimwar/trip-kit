import { useState, type FormEvent } from "react";
import { useLocalStorage, uid } from "../lib/useLocalStorage";

type Outfit = { id: string; date: string; look: string; weather: string };
const WEATHER = ["Hot", "Warm", "Rainy", "Cool", "Cold"];
const today = () => new Date().toISOString().slice(0, 10);

export default function Outfits() {
  const [outfits, setOutfits] = useLocalStorage<Outfit[]>("tk-outfits", []);
  const [form, setForm] = useState({ date: today(), look: "", weather: "Warm" });

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!form.look.trim()) return;
    setOutfits([{ id: uid(), ...form, look: form.look.trim() }, ...outfits]);
    setForm({ ...form, look: "" });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="panel grid gap-3 sm:grid-cols-[9rem_8rem_1fr_auto]">
        <input type="date" className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} aria-label="Date" />
        <select className="field" value={form.weather} onChange={(e) => setForm({ ...form, weather: e.target.value })} aria-label="Weather">
          {WEATHER.map((w) => <option key={w}>{w}</option>)}
        </select>
        <input className="field" placeholder="Linen shirt, white sneakers, cap" value={form.look} onChange={(e) => setForm({ ...form, look: e.target.value })} aria-label="Outfit" />
        <button className="btn">Log outfit</button>
      </form>
      {outfits.length === 0 && <p className="text-ink/60">No outfits logged yet. Record what you wore so you don’t repeat it.</p>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {[...outfits].sort((a, b) => b.date.localeCompare(a.date)).map((o) => (
          <li key={o.id} className="panel">
            <div className="flex items-baseline justify-between">
              <span className="font-display font-semibold">
                {new Date(o.date + "T00:00").toLocaleDateString("en-MY", { weekday: "short", day: "numeric", month: "short" })}
              </span>
              <span className="text-sm text-sea">{o.weather}</span>
            </div>
            <p className="mt-2">{o.look}</p>
            <button className="btn-quiet mt-2" onClick={() => setOutfits(outfits.filter((x) => x.id !== o.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
