"use client";
import { useState } from "react";
import ChatModal from "./components/ChatModal";
import Link from "next/link"; import { motion } from "framer-motion"; import { Plane, CreditCard, User, Bot } from "lucide-react";
export default function Page(){return(<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}>
<header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm sticky top-0 z-50">
<h1 className="text-2xl font-bold text-brandBlue">EAN Aviation</h1>
<nav className="space-x-6 text-gray-600"><Link href="/">Home</Link><a>FBO Services</a><a>Charter</a><a>Leasing</a><a>Contact</a></nav>
<Link href="/booking" className="bg-brandBlue text-white px-4 py-2 rounded-md">Book a Flight</Link></header>
<section className="flex flex-col items-center text-center py-24 px-8 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center text-white">
<div className="bg-black/40 p-10 rounded-2xl"><h2 className="text-4xl font-bold mb-4">Your Journey, Elevated</h2>
<p className="text-lg mb-8 max-w-2xl mx-auto">Experience the future of business aviation with EAN’s Smart Journey ID — powered by Descasio & AWS.</p>
<Link href="/booking" className="inline-block bg-brandAmber text-black font-semibold px-8 py-4 rounded-full hover:opacity-90">Start Your Journey</Link></div></section>
<section className="py-16 bg-white"><div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-8">{
[{Icon:Plane,title:"Upcoming Trip",detail:"Lagos → London | 23 Oct 2025"},
{Icon:CreditCard,title:"Payment Status",detail:"Paid | ₦18,500,000 via Paystack"},
{Icon:User,title:"Smart Journey ID",detail:"#EANJI-0241 | QR Generated"}].map((item,i)=>(
<motion.div key={i} whileHover={{y:-4,scale:1.02}}><div className="bg-white rounded-xl shadow p-6 text-center border">
<item.Icon className="mx-auto mb-3 text-brandBlue" size={36}/><h4 className="font-semibold text-brandBlue">{item.title}</h4>
<p className="text-sm text-gray-600">{item.detail}</p></div></motion.div>))}
</div></section>
<section className="py-16 bg-blue-50"><div className="max-w-5xl mx-auto text-center"><div className="inline-block bg-white rounded-2xl p-8 shadow-md">
<Bot className="text-brandBlue mx-auto mb-3" size={36}/><h4 className="text-brandBlue font-semibold mb-2">AI Concierge Assistant</h4>
<p className="text-gray-600 text-sm mb-4">Hi, I’m your EAN AI Concierge! I can help you modify bookings, pre-order lounge services, and arrange ground transport — conceptually powered by AWS Bedrock.</p>
<button onClick={() => setOpen(true)} className="bg-brandBlue text-white px-6 py-2 rounded-full inline-block">Chat with Concierge</button></div></div></section>
<footer className="bg-brandBlue text-white py-10 text-center text-sm"><p>© 2025 EAN Aviation | Powered by Descasio + AWS | Smart Journey Experience</p></footer>
</motion.div>);}
