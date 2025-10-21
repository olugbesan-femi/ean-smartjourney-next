"use client";

import { useEffect, useRef, useState } from "react";

export default function FaceIdModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "matched" | "failed">("idle");
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCam = async () => {
      try {
        setStatus("scanning");
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        // demo: after 2s, return a fake match score
        setTimeout(() => {
          const s = Math.floor(92 + Math.random() * 6); // 92–98%
          setScore(s);
          setStatus(s >= 95 ? "matched" : "failed");
        }, 2000);
      } catch {
        setStatus("failed");
      }
    };

    if (open) startCam();

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
      setStatus("idle");
      setScore(null);
    };
  }, [open]);

  if (!open) return null;

  const pill = (txt: string, cls: string) => (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${cls}`}>{txt}</span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <div className="font-semibold">Facial ID (Demo)</div>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close ✖</button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl overflow-hidden border bg-black">
            <video ref={videoRef} className="w-full h-64 object-cover" muted playsInline />
          </div>

          <div className="text-sm text-gray-700 flex items-center gap-2">
            Status:
            {status === "idle" && pill("Idle", "bg-gray-100 text-gray-700")}
            {status === "scanning" && pill("Scanning…", "bg-blue-100 text-blue-700")}
            {status === "matched" && pill("Match", "bg-green-100 text-green-700")}
            {status === "failed" && pill("Failed", "bg-red-100 text-red-700")}
            {score !== null && <span className="ml-2 text-gray-500">Score: {score}%</span>}
          </div>

          <p className="text-xs text-gray-500">
            Demo only. In production, this would call a backend (e.g., Amazon Rekognition FaceCompare) with liveness checks and regulator-approved flows.
          </p>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md border">Close</button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-white ${status === "matched" ? "bg-green-600" : "bg-gray-400"}`}
              disabled={status !== "matched"}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}