import React from 'react';
import { riskConfig } from '../constants';

export default function ClauseCard({ clause, isActive, lang, onHover, cardRef }) {
  const cfg = riskConfig[clause.risk];
  return (
    <div
      ref={cardRef}
      onMouseEnter={() => onHover(clause.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 10,
        border: `1px solid ${isActive ? cfg.border : "#1e293b"}`,
        background: isActive ? "#0f172a" : "#0a0f1a",
        padding: "14px 16px",
        transition: "all 0.2s",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: cfg.dot, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cfg.label}</span>
        {clause.flag && (
          <span style={{ marginLeft: "auto", fontSize: 10, background: cfg.bg, color: cfg.text, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
            {clause.flag}
          </span>
        )}
      </div>
      {lang === "ur" ? (
        <p dir="rtl" style={{ margin: 0, fontSize: 18, lineHeight: 2, color: "#e2e8f0", fontFamily: "'Noto Nastaliq Urdu', serif", textAlign: "right" }}>
          {clause.plain_ur}
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#e2e8f0" }}>
          {clause.plain_en}
        </p>
      )}
    </div>
  );
}
