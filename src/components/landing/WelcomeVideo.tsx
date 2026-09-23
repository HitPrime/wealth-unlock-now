import { useRef, useState } from "react";

export function WelcomeVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src="https://assets.cdn.filesafe.space/5HWy6bgOsEC3bfBTO15d/media/6ab3d8ce8d8128ee4ca80bbf.mp4"
        autoPlay
        muted
        controls
        playsInline
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="w-full block"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow: "0 20px 40px rgba(88,28,135,0.3)",
          background: "#000",
        }}
      />
      <button
        type="button"
        onClick={toggleSound}
        style={{
          position: "absolute", bottom: "14px", left: "14px",
          background: "rgba(0,0,0,0.7)", color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px",
          padding: "5px 14px", fontSize: "12px", cursor: "pointer",
          fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
          backdropFilter: "blur(8px)",
        }}
      >
        {muted ? "🔇 Tap for sound" : "🔊 Sound on"}
      </button>
    </div>
  );
}
