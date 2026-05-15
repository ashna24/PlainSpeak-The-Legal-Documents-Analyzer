import React from 'react';
import { riskConfig } from '../constants';

export default function HighlightedText({ text, clauses, activeId, onHover }) {
  if (!clauses.length) return (
    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 15, color: "#cbd5e1", lineHeight: 1.8 }}>{text}</pre>
  );

  const segments = [];
  let remaining = text;
  let cursor = 0;

  const sorted = [...clauses].sort((a, b) => text.indexOf(a.original) - text.indexOf(b.original));

  for (const clause of sorted) {
    const idx = remaining.indexOf(clause.original);
    if (idx === -1) continue;
    const absIdx = cursor + idx;
    if (idx > 0) segments.push({ type: "plain", text: remaining.slice(0, idx) });
    segments.push({ type: "clause", clause, text: clause.original });
    remaining = remaining.slice(idx + clause.original.length);
    cursor = absIdx + clause.original.length;
  }
  if (remaining) segments.push({ type: "plain", text: remaining });

  return (
    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 15, lineHeight: 1.8, color: "#f8fafc" }}>
      {segments.map((seg, i) => {
        if (seg.type === "plain") return <span key={i}>{seg.text}</span>;
        const cfg = riskConfig[seg.clause.risk];
        const isActive = activeId === seg.clause.id;
        return (
          <mark
            key={i}
            onMouseEnter={() => onHover(seg.clause.id)}
            onMouseLeave={() => onHover(null)}
            style={{
              background: isActive ? cfg.border : cfg.bg,
              color: cfg.text,
              borderRadius: 3,
              padding: "1px 3px",
              cursor: "pointer",
              outline: isActive ? `2px solid ${cfg.border}` : "none",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            {seg.text}
          </mark>
        );
      })}
    </pre>
  );
}
