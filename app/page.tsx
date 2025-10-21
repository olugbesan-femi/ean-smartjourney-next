"use client";

import { useState } from "react";
import Link from "next/link";
import ChatModal from "./components/ChatModal";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const tap = (intent: string) => { setSeed(intent); setOpen(true); };

  return (
    <div>
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-900">EAN Aviation</h1>
        <nav className="space-x-6 text-gray-600">
          <Link href="/">Home</Link>
          <a>FBO Services</a>
          <a>Charter</a>
          <a>Leasing</a>
          <a>Contact</a>
        </nav>
        <Link href="/booking" className="bg-blue-900 text-white px-4 py-2 rounded-md">Book a Flight</Link>
      </header>

      <section className="flex flex-col items-center text-center py-24 px-8 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center text-white">
        <div className="bg-black/40 p-10 rounded-2xl">
          <h2 className="text-4xl font-bold mb-4">Your Journey, Elevated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the future of business aviation with EAN’s Smart Journey ID — powered by Descasio & AWS.
          </p>
          <Link href="/booking" className="inline-block bg-yellow-300 text-black font-semibold px-8 py-4 rounded-full hover:opacity-90">
            Start Your Journey
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-8">
          {[
            { title: "Upcoming Trip", detail: "Lagos → London | 23 Oct 2025" },
            { title: "Payment Status", detail: "Paid | ₦18,500,000 via Paystack" },
            { title: "Smart Journey ID", detail: "#EANJI-0241 | QR Generated" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 text-center border">
              <h4 className="font-semibold text-blue-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-md">
            <h4 className="text-blue-900 font-semibold mb-2">AI Concierge Assistant</h4>
            <p className="text-gray-600 text-sm mb-4">One-tap actions to demonstrate the Smart Journey.</p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button onClick={() => tap("Generate lounge access QR")} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Generate QR</button>
              <button onClick={() => tap("Request chauffeur pickup")} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Request Chauffeur</button>
              <button onClick={() => tap("Send invoice payment link")} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Send Invoice Link</button>
              <button onClick={() => tap("Update catering preferences to steak medium and sparkling water")} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Catering: Steak</button>
              <Link href="/booking" className="px-3 py-1 rounded-full text-sm bg-yellow-200 text-yellow-900">Open Dashboard</Link>
            </div>
            <button onClick={() => setOpen(true)} className="bg-blue-900 text-white px-6 py-2 rounded-full inline-block">
              Chat with Concierge
            </button>
          </div>
        </div>
      </section>

      <ChatModal open={open} onClose={() => setOpen(false)} seed={seed} />

      <footer className="bg-blue-900 text-white py-10 text-center text-sm">
        <p>© 2025 EAN Aviation | Powered by Descasio + AWS | Smart Journey Experience</p>
      </footer>
    </div>
  );
}