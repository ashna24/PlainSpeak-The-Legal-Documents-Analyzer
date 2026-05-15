import React from 'react';

export default function RiskMeter({ score }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981";
  const label = score >= 70 ? "High Risk" : score >= 40 ? "Medium Risk" : "Low Risk";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1, height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          width: `${score}%`, height: "100%", background: color,
          borderRadius: 4, transition: "width 1s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{ minWidth: 90, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{score}</span>
        <span style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.3 }}>/100<br />{label}</span>
      </div>
    </div>
  );
}
