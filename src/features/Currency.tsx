import { useEffect, useState } from "react";

type Props = { home: string };

export default function Currency({ home }: Props) {
  const [list, setList] = useState<Record<string, string>>({});
  const [from, setFrom] = useState(home);
  const [to, setTo] = useState(home === "JPY" ? "USD" : "JPY");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/currencies").then((r) => r.json()).then(setList).catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (from === to) { setRate(1); return; }
    setRate(null);
    setError(false);
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setRate(d.rates[to]))
      .catch(() => setError(true));
  }, [from, to]);

  const codes = Object.keys(list);
  const result = rate !== null ? (parseFloat(amount || "0") * rate).toLocaleString("en-MY", { maximumFractionDigits: 2 }) : "…";

  const select = (value: string, set: (v: string) => void, label: string) => (
    <select className="field" value={value} onChange={(e) => set(e.target.value)} aria-label={label}>
      {(codes.length ? codes : [value]).map((c) => <option key={c} value={c}>{c} {list[c] ? `· ${list[c]}` : ""}</option>)}
    </select>
  );

  return (
    <div className="panel space-y-4">
      <input className="field text-lg" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Amount" />
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        {select(from, setFrom, "From currency")}
        <button className="btn" onClick={() => { setFrom(to); setTo(from); }}>Swap</button>
        {select(to, setTo, "To currency")}
      </div>
      {error ? (
        <p className="text-clay">Couldn’t fetch rates. Try again in a moment.</p>
      ) : (
        <>
          <p className="font-display text-4xl font-extrabold tabular-nums">{result} <span className="text-xl text-ink/60">{to}</span></p>
          {rate !== null && <p className="text-sm text-ink/60">1 {from} = {rate} {to}. Rates are daily reference rates, not what a money changer will give you.</p>}
        </>
      )}
    </div>
  );
}
