cat > app/components/ChatModal.tsx <<'EOF'
"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

export default function ChatModal({
  open,
  onClose,
  seed,
}: { open: boolean; onClose: () => void; seed?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi, I'm your EAN AI Concierge 🤖 — I can arrange transport, generate your access QR, or share your latest invoice. What do you need?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const respond = (text: string): string => {
    const t = text.toLowerCase();
    if (t.includes("chauffeur") || t.includes("pickup") || t.includes("transport")) return "✅ Chauffeur requested. Driver ETA will be shared 30 mins before arrival. Add water & Wi-Fi?";
    if (t.includes("invoice") || t.includes("pay")) return "💳 Latest invoice INV-22194 = ₦18,500,000. Paystack link sent. Resend here?";
    if (t.includes("access") || t.includes("qr") || t.includes("lounge")) return "🪪 SJI #EANJI-0241. Time-bound QR generated. Share now?";
    if (t.includes("catering") || t.includes("meal") || t.includes("food")) return "🍽️ Catering set to steak (medium), sparkling water, fruit platter. Anything else?";
    if (t.includes("status") || t.includes("turnaround") || t.includes("eta")) return "🛫 Turnaround on track. Fueling done; catering in prep; boarding 15:35. Push notifications?";
    return "I can help with pickups, access QR, invoices, lounge bookings, or status. What should I do?";
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { role: "user", text: clean }, { role: "assistant", text: respond(clean) }]);
  };

  useEffect(() => {
    if (open && seed) {
      const id = setTimeout(() => send(seed), 250);
      return () => clearTimeout(id);
    }
  }, [open, seed]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { send(input); setInput(""); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <div className="font-semibold">AI Concierge (Demo)</div>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close ✖</button>
        </div>
        <div ref={scrollRef} className="h-80 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} px-3 py-2 rounded-xl max-w-[80%]`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-4 border-t">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Type a message…" className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
          <button onClick={() => { send(input); setInput(""); }} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2">Send</button>
        </div>
        <div className="px-5 pb-4 text-xs text-gray-500">Responses are simulated for demo purposes.</div>
      </div>
    </div>
  );
}
EOF