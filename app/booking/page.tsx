"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QRModal from "../components/QRModal";
import FaceIdModal from "../components/FaceIdModal";

export default function Booking() {
  const [openQR, setOpenQR] = useState(false);
  const [openFace, setOpenFace] = useState(false);
  const sji = "EANJI-0241";

  return (
    <div>
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/ean-logo.png" alt="EAN Aviation" width={140} height={40} className="object-contain" priority />
        </div>
        <nav className="space-x-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/booking">Booking</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Client Booking Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center border">
            <h4 className="font-semibold text-blue-900">Upcoming Trip</h4>
            <p className="text-sm text-gray-600">Lagos → London | 23 Oct 2025</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center border">
            <h4 className="font-semibold text-blue-900">Smart Journey ID</h4>
            <p className="text-sm text-gray-600">#{sji} | Credentials Available</p>
            <div className="flex gap-2 justify-center mt-3">
              <button onClick={() => setOpenQR(true)} className="bg-blue-900 text-white px-4 py-2 rounded-md">
                Show Access QR
              </button>
              <button onClick={() => setOpenFace(true)} className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Facial ID
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center border">
            <h4 className="font-semibold text-blue-900">Actions</h4>
            <ul className="text-sm text-gray-700 space-y-1 mt-2">
              <li>• Request Chauffeur (demo)</li>
              <li>• Update Catering (demo)</li>
              <li>• Download Invoice (demo)</li>
            </ul>
          </div>
        </div>

        {/* Modals */}
        <QRModal open={openQR} onClose={() => setOpenQR(false)} sji={sji} />
        <FaceIdModal open={openFace} onClose={() => setOpenFace(false)} />
      </main>

      <footer className="bg-blue-900 text-white py-10 text-center text-sm">
        <p>© 2025 EAN Aviation | Powered by Descasio + AWS | Smart Journey Experience</p>
      </footer>
    </div>
  );
}