"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ChatModal from "./components/ChatModal";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const tap = (intent: string) => { setSeed(intent); setOpen(true); };

  return (
    <div>
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/ean-logo.png" alt="EAN Aviation" width={140} height={40} className="object-contain" priority />
        </div>
        <nav className="space-x-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/booking">Booking Dashboard</Link>
        </nav>
      </header>

      <section className="flex flex-col items-center text-center py-20 px-8 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center text-white">
        <div className="bg-black/40 p-10 rounded-2xl">
          <h2 className="text-4xl font-bold mb-4">Your Journey, Elevated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            One booking triggers transport, secure access, lounge prep, billing, and feedback — powered by Descasio + AWS.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/booking" className="inline-block bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full hover:opacity-90">
              Open Booking Dashboard
            </Link>
            <button onClick={() => setOpen(true)} className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full">
              Chat with Concierge
            </button>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-8">
          {[
            { title: "Predictive CX", detail: "Smart Journey ID automates every touchpoint" },
            { title: "Automation", detail: "FBO One ↔ Sage ↔ Salesforce ↔ Paystack" },
            { title: "Security", detail: "Time-bound QR + Facial ID + audit trails" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 text-center border">
              <h4 className="font-semibold text-blue-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <ChatModal open={open} onClose={() => setOpen(false)} seed={seed} />
      <footer className="bg-blue-900 text-white py-10 text-center text-sm mt-10">
        <p>© 2025 EAN Aviation | Powered by Descasio + AWS | Smart Journey Experience</p>
      </footer>
    </div>
  );
}