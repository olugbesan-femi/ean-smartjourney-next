"use client";
import { motion } from "framer-motion"; import Link from "next/link";
export default function Booking(){return(<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
<header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">
<h1 className="text-2xl font-bold text-brandBlue">EAN Aviation</h1><nav className="space-x-6 text-gray-600"><Link href="/">Home</Link></nav></header>
<main className="max-w-5xl mx-auto px-8 py-16">
<h2 className="text-3xl font-bold text-brandBlue mb-6">Client Booking Dashboard</h2>
<div className="grid md:grid-cols-3 gap-6"><div className="bg-white rounded-xl shadow p-6 text-center border">
<h4 className="font-semibold text-brandBlue">Upcoming Trip</h4><p className="text-sm text-gray-600">Lagos → London | 23 Oct 2025</p></div>
<div className="bg-white rounded-xl shadow p-6 text-center border"><h4 className="font-semibold text-brandBlue">Payment Status</h4>
<p className="text-sm text-gray-600">Paid | ₦18,500,000 via Paystack</p></div>
<div className="bg-white rounded-xl shadow p-6 text-center border"><h4 className="font-semibold text-brandBlue">Smart Journey ID</h4>
<p className="text-sm text-gray-600">#EANJI-0241 | QR Generated</p></div></div>
<div className="mt-12"><h3 className="text-xl font-semibold text-brandBlue mb-2">Actions</h3>
<ul className="list-disc list-inside text-gray-700"><li>Generate QR for access (concept)</li><li>Trigger Chauffeur pickup (concept)</li><li>Update catering preferences (concept)</li></ul></div>
</main>
<footer className="bg-brandBlue text-white py-10 text-center text-sm"><p>© 2025 EAN Aviation | Powered by Descasio + AWS | Smart Journey Experience</p></footer>
</motion.div>);}
