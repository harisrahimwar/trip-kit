import { useState, type FormEvent } from "react";
import { useLocalStorage, uid } from "../lib/useLocalStorage";

type Todo = { id: string; text: string; done: boolean };

export default function Todos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("tk-todos", []);
  const [text, setText] = useState("");
  const done = todos.filter((t) => t.done).length;

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: uid(), text: text.trim(), done: false }]);
    setText("");
  };

  return (
    <div className="panel space-y-4">
      <form onSubmit={add} className="flex gap-3">
        <input className="field" placeholder="Book airport transfer, pack charger…" value={text} onChange={(e) => setText(e.target.value)} aria-label="New task" />
        <button className="btn">Add task</button>
      </form>
      {todos.length > 0 && (
        <p className="text-sm text-ink/60">{done} of {todos.length} done</p>
      )}
      {todos.length === 0 && <p className="text-ink/60">Nothing to do yet. Add what you need to sort before you go.</p>}
      <ul className="divide-y divide-ink/10">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              className="size-5 accent-(--accent)"
              checked={t.done}
              onChange={() => setTodos(todos.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
              aria-label={t.text}
            />
            <span className={`flex-1 ${t.done ? "text-ink/40 line-through" : ""}`}>{t.text}</span>
            <button className="btn-quiet" onClick={() => setTodos(todos.filter((x) => x.id !== t.id))}>Remove</button>
          </li>
        ))}
      </ul>
      {done > 0 && (
        <button className="btn-quiet" onClick={() => setTodos(todos.filter((t) => !t.done))}>Clear completed</button>
      )}
    </div>
  );
}
