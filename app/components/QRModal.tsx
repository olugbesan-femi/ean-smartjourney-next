"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function fmt(seconds: number) {
  const m = Math.max(0, Math.floor(seconds / 60));
  const s = Math.max(0, seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function QRModal({
  open,
  onClose,
  sji,
  ttlSeconds = 30 * 60, // 30 minutes
}: {
  open: boolean;
  onClose: () => void;
  sji: string;
  ttlSeconds?: number;
}) {
  const [remaining, setRemaining] = useState(ttlSeconds);
  const startRef = useRef<number | null>(null);

  const validUntil = useMemo(() => {
    const dt = new Date(Date.now() + ttlSeconds * 1000);
    return dt.toLocaleString();
  }, [ttlSeconds]);

  useEffect(() => {
    if (!open) return;
    startRef.current = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - (startRef.current || 0)) / 1000);
      setRemaining(Math.max(0, ttlSeconds - elapsed));
    }, 1000);

    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);

    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onEsc);
      setRemaining(ttlSeconds);
      startRef.current = null;
    };
  }, [open, onClose, ttlSeconds]);

  if (!open) return null;
  const expired = remaining <= 0;
  const payload = JSON.stringify({
    SJI: sji,
    scope: "lounge_access",
    validUntil,
    signed: false, // demo only — sign & verify server-side in prod
  });
  const progress = Math.round(((ttlSeconds - remaining) / ttlSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <div className="font-semibold">Smart Journey Access QR</div>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close ✖</button>
        </div>
        <div className="p-6 text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${expired ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
            {expired ? "Expired" : "Valid"} • {fmt(remaining)} remaining
          </div>

          <div className="mx-auto inline-block bg-white p-4 rounded-xl border">
            {expired
              ? <div className="text-sm text-red-600">QR expired. Regenerate from your dashboard.</div>
              : <QRCodeSVG value={payload} size={220} includeMargin />}
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="text-sm text-gray-600">
            <div><b>SJI:</b> {sji}</div>
            <div><b>Scope:</b> Lounge & Pre-boarding</div>
            <div><b>Valid until:</b> {validUntil}</div>
          </div>

          <p className="text-xs text-gray-500">
            Demo only. In production this QR is signed, time-bound, and verified at entry.
          </p>
        </div>
      </div>
    </div>
  );
}